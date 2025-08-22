import { AppDataSource } from "../data-source";
import { Reservation } from "../entities/Reservation";
import { Equipment } from "../entities/Equipment";
import { Employee } from "../entities/Employee";
import { Conflict, NotFound } from "../utils/http-errors";
import { IsNull } from "typeorm";

const resRepo = () => AppDataSource.getRepository(Reservation);
const eqRepo = () => AppDataSource.getRepository(Equipment);
const empRepo = () => AppDataSource.getRepository(Employee);

export const ReservasService = {
  async criarReserva(dto: { funcionario_id: number; equipamento_id: number }) {
    const funcionario = await empRepo().findOne({
      where: { id: dto.funcionario_id, is_active: true },
    });
    if (!funcionario) throw NotFound("Funcionário não encontrado ou inativo");

    const equipamento = await eqRepo().findOne({
      where: { id: dto.equipamento_id, is_active: true },
    });
    if (!equipamento) throw NotFound("Equipamento não encontrado ou inativo");
    if (equipamento.status === "manutencao")
      throw Conflict("Equipamento em manutenção");
    if (equipamento.status === "emprestado")
      throw Conflict("Equipamento já emprestado");

    // verificar se já existe reserva ativa para este equipamento
    const reservaAtivaEquip = await resRepo().findOne({
      where: { equipamento: { id: equipamento.id }, data_fim: IsNull() },
    });
    if (reservaAtivaEquip)
      throw Conflict("Já existe uma reserva ativa para este equipamento");

    // verificar se funcionário já tem reserva ativa
    const reservaAtivaFuncionario = await resRepo().findOne({
      where: { funcionario: { id: funcionario.id }, data_fim: IsNull() },
    });
    if (reservaAtivaFuncionario)
      throw Conflict("Funcionário já está utilizando outro equipamento");

    // criar reserva
    const nova = resRepo().create({ funcionario, equipamento, data_fim: null });
    const saved = await resRepo().save(nova);

    // atualizar status do equipamento
    equipamento.status = "emprestado";
    await eqRepo().save(equipamento);

    return saved;
  },

  async finalizarReserva(id: number) {
    const r = await resRepo().findOne({ where: { id } });
    if (!r) throw NotFound("Reserva não encontrada");
    if (r.data_fim) throw Conflict("Reserva já finalizada");

    r.data_fim = new Date();
    await resRepo().save(r);

    // liberar equipamento
    const eq = await eqRepo().findOne({ where: { id: r.equipamento.id } });
    if (eq) {
      eq.status = "disponivel";
      await eqRepo().save(eq);
    }

    return r;
  },

  async listar() {
    // graças ao eager: true nas entidades, já traz funcionario + equipamento
    return resRepo().find({ order: { id: "DESC" } });
  },
};
