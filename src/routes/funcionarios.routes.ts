import { Router } from "express";
import { FuncionariosController } from "../controllers/funcionarios.controller";

const r = Router();

r.post("/", FuncionariosController.create);
r.get("/", FuncionariosController.list);
r.get("/:id", FuncionariosController.get);
r.put("/:id", FuncionariosController.update);
r.delete("/:id", FuncionariosController.softDelete);

export default r;
