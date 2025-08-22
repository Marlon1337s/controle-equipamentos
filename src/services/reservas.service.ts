import { AppDataSource } from "../data-source";
import { Reservation } from "../entities/Reservation";
import { Equipment } from "../entities/Equipment";
import { Employee } from "../entities/Employee";
import { Conflict, NotFound } from "../utils/http-errors";
import { IsNull } from "typeorm";

const resRepo = () => AppDataSource.getRepository(Reservation);
const eqRepo = () => AppDataSource.getRepository(Equipment);
const empRepo = () => AppDataSource.getRepository(Employee);

type CriarReservaDTO = {
  funcionario_id: number;
  equipamento_id: number;
  // opcionais para agendamento:
  data_inicio?: string; // ISO: "2025-09-01T09:00:00"
  data_fim?: string | null; // ISO ou null (aberto)
};

export const ReservasService = {
  async criarReserva(dto: CriarReservaDTO) {
    const funcionario = await empRepo().findOne({
      where: { id: dto.funcionario_id, is_active: true },
    });
    if (!funcionario) throw NotFound("Funcionário não encontrado ou inativo");

    const equipamento = await eqRepo().findOne({
      where: { id: dto.equipamento_id, is_active: true },
    });
    if (!equipamento) throw NotFound("Equipamento não encontrado ou inativo");

    if (equipamento.status === "manutencao") {
      throw Conflict("Equipamento em manutenção");
    }

    const newStart = dto.data_inicio ? new Date(dto.data_inicio) : new Date();
    const newEnd = dto.data_fim ? new Date(dto.data_fim) : null;

    if (Number.isNaN(newStart.getTime())) {
      throw Conflict("data_inicio inválida");
    }
    if (newEnd && Number.isNaN(newEnd.getTime())) {
      throw Conflict("data_fim inválida");
    }
    if (newEnd && newEnd <= newStart) {
      throw Conflict("data_fim deve ser maior que data_inicio");
    }

    const qbEquip = resRepo()
      .createQueryBuilder("r")
      .where("r.equipamento_id = :equipId", { equipId: dto.equipamento_id })
      .andWhere("(r.data_fim IS NULL OR r.data_fim > :newStart)", { newStart });

    if (newEnd) {
      qbEquip.andWhere("r.data_inicio < :newEnd", { newEnd });
    }

    const conflitoEquip = await qbEquip.getOne();
    if (conflitoEquip) {
      throw Conflict(
        "Já existe uma reserva que conflita com o período informado (equipamento)."
      );
    }

    const qbFunc = resRepo()
      .createQueryBuilder("r")
      .where("r.funcionario_id = :funcId", { funcId: dto.funcionario_id })
      .andWhere("(r.data_fim IS NULL OR r.data_fim > :newStart)", { newStart });

    if (newEnd) {
      qbFunc.andWhere("r.data_inicio < :newEnd", { newEnd });
    }

    const conflitoFunc = await qbFunc.getOne();
    if (conflitoFunc) {
      throw Conflict(
        "Funcionário já possui reserva que conflita com o período informado."
      );
    }

    const nova = resRepo().create({
      funcionario,
      equipamento,
      data_inicio: newStart,
      data_fim: newEnd ?? null,
    });
    const saved = await resRepo().save(nova);

    const agora = new Date();
    const reservaEmAndamento = newStart <= agora && (!newEnd || newEnd > agora);

    if (reservaEmAndamento) {
      equipamento.status = "emprestado";
      await eqRepo().save(equipamento);
    }

    return saved;
  },

  async finalizarReserva(id: number) {
    const r = await resRepo().findOne({ where: { id } });
    if (!r) throw NotFound("Reserva não encontrada");
    if (r.data_fim) throw Conflict("Reserva já finalizada");

    r.data_fim = new Date();
    await resRepo().save(r);

    const eq = await eqRepo().findOne({ where: { id: r.equipamento.id } });
    if (eq) {
      const agora = new Date();

      const outraAtiva = await resRepo()
        .createQueryBuilder("rx")
        .where("rx.equipamento_id = :equipId", { equipId: eq.id })
        .andWhere("rx.data_inicio <= :agora", { agora })
        .andWhere("(rx.data_fim IS NULL OR rx.data_fim > :agora)", { agora })
        .getOne();

      if (outraAtiva) {
        if (eq.status !== "emprestado") {
          eq.status = "emprestado";
          await eqRepo().save(eq);
        }
      } else {
        if (eq.status !== "disponivel") {
          eq.status = "disponivel";
          await eqRepo().save(eq);
        }
      }
    }

    return r;
  },

  async listar() {
    return resRepo().find({ order: { id: "DESC" } });
  },
};
