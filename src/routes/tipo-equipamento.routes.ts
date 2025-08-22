import { Router } from "express";
import { TipoEquipamentoController } from "../controllers/tipo-equipamento.controller";

const r = Router();

r.post("/", TipoEquipamentoController.create);
r.get("/", TipoEquipamentoController.list);
r.get("/:id", TipoEquipamentoController.get);
r.put("/:id", TipoEquipamentoController.update);
r.delete("/:id", TipoEquipamentoController.softDelete);

export default r;
