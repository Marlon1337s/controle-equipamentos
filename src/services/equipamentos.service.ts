import { AppDataSource } from "../data-source";
import { Equipment, EquipmentStatus } from "../entities/Equipment";
import { EquipmentType } from "../entities/EquipmentType";
import { BadRequest, NotFound } from "../utils/http-errors";
import { ILike } from "typeorm";

type CreateDTO = {
  nome_equipamento: string;
  id_tipo_equipamento: number;
  created_by?: string;
};
type UpdateDTO = {
  nome_equipamento?: string;
  id_tipo_equipamento?: number;
  status?: EquipmentStatus;
  updated_by?: string;
};

const eqRepo = () => AppDataSource.getRepository(Equipment);
const typeRepo = () => AppDataSource.getRepository(EquipmentType);

export const EquipamentosService = {
  async create(dto: CreateDTO) {
    const tipo = await typeRepo().findOne({
      where: { id: dto.id_tipo_equipamento, status: true },
    });
    if (!tipo) throw NotFound("Tipo de equipamento não encontrado ou inativo");

    const entity = eqRepo().create({
      nome_equipamento: dto.nome_equipamento,
      tipo,
      status: "disponivel",
      is_active: true,
      created_by: dto.created_by ?? "system",
    });
    return eqRepo().save(entity);
  },

  async list(params: {
    tipoId?: number;
    status?: EquipmentStatus;
    incluirInativos?: boolean;
    nome?: string;
  }) {
    const where: any = {};
    if (!params.incluirInativos) where.is_active = true;
    if (params.status) where.status = params.status;
    if (params.nome) where.nome_equipamento = ILike(`%${params.nome}%`);
    if (params.tipoId) where.tipo = { id: params.tipoId };

    return eqRepo().find({ where, order: { id: "ASC" } });
  },

  async get(id: number) {
    const found = await eqRepo().findOne({ where: { id } });
    if (!found) throw NotFound("Equipamento não encontrado");
    console.log(found);
    return found;
  },

  async update(id: number, dto: UpdateDTO) {
    const ent = await this.get(id);
    if (dto.id_tipo_equipamento) {
      const tipo = await typeRepo().findOne({
        where: { id: dto.id_tipo_equipamento, status: true },
      });
      if (!tipo)
        throw NotFound("Tipo de equipamento não encontrado ou inativo");
      ent.tipo = tipo;
    }
    if (dto.nome_equipamento) ent.nome_equipamento = dto.nome_equipamento;
    if (dto.status) ent.status = dto.status;
    ent.updated_by = dto.updated_by ?? "system";
    return eqRepo().save(ent);
  },

  async softDelete(id: number, updated_by?: string) {
    const ent = await this.get(id);
    ent.is_active = false;
    ent.updated_by = updated_by ?? "system";
    return eqRepo().save(ent);
  },
};
