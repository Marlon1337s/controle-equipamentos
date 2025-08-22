import { Router } from "express";
import { EquipamentosController } from "../controllers/equipamentos.controller";

const r = Router();

r.post("/", EquipamentosController.create);
r.get("/", EquipamentosController.list);
r.get("/:id", EquipamentosController.get);
r.put("/:id", EquipamentosController.update);
r.delete("/:id", EquipamentosController.softDelete);

export default r;
