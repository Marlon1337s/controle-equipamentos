import { AppDataSource } from "../data-source";
import { Employee } from "../entities/Employee";
import { BadRequest, NotFound } from "../utils/http-errors";
import { ILike } from "typeorm";

type CreateDTO = { nome: string; departamento: string; created_by?: string };
type UpdateDTO = { nome?: string; departamento?: string; updated_by?: string };

const repo = () => AppDataSource.getRepository(Employee);

export const FuncionariosService = {
  async create(dto: CreateDTO) {
    if (!dto.nome || !dto.departamento)
      throw BadRequest("nome e departamento são obrigatórios");
    const e = repo().create({ ...dto, is_active: true });
    return repo().save(e);
  },

  async list(params: { nome?: string; incluirInativos?: boolean }) {
    const where: any = {};
    if (params.nome) where.nome = ILike(`%${params.nome}%`);
    if (!params.incluirInativos) where.is_active = true;
    return repo().find({ where, order: { id: "ASC" } });
  },

  async get(id: number) {
    const f = await repo().findOne({ where: { id } });
    if (!f) throw NotFound("Funcionário não encontrado");
    return f;
  },

  async update(id: number, dto: UpdateDTO) {
    const f = await this.get(id);
    if (dto.nome) f.nome = dto.nome;
    if (dto.departamento) f.departamento = dto.departamento;
    f.updated_by = dto.updated_by ?? "system";
    return repo().save(f);
  },

  async softDelete(id: number, updated_by?: string) {
    const f = await this.get(id);
    f.is_active = false;
    f.updated_by = updated_by ?? "system";
    return repo().save(f);
  },
};
