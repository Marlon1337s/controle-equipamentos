import { AppDataSource } from "../data-source";
import { EquipmentType } from "../entities/EquipmentType";
import { NotFound } from "../utils/http-errors";

const repo = () => AppDataSource.getRepository(EquipmentType);

export const TipoEquipamentoService = {
  async create(dto: { tipo_equipamento: string; created_by?: string }) {
    const e = repo().create({ ...dto, status: true });
    return repo().save(e);
  },
  async list() {
    return repo().find({ where: { status: true } });
  },
  async get(id: number) {
    const found = await repo().findOne({ where: { id } });
    if (!found) throw NotFound("Tipo de equipamento não encontrado");
    return found;
  },
  async update(
    id: number,
    dto: { tipo_equipamento?: string; updated_by?: string }
  ) {
    const found = await this.get(id);
    if (dto.tipo_equipamento) found.tipo_equipamento = dto.tipo_equipamento;
    if (dto.updated_by) found.updated_by = dto.updated_by;
    return repo().save(found);
  },
  async softDelete(id: number, updated_by?: string) {
    const found = await this.get(id);
    found.status = false;
    found.updated_by = updated_by ?? "system";
    return repo().save(found);
  },
};
