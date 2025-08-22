import { Router } from "express";
import { ReservasController } from "../controllers/reservas.controller";

const r = Router();

r.post("/", ReservasController.create); // criar reserva (início)
r.put("/:id/finalizar", ReservasController.finish); // finalizar (data_fim)
r.get("/", ReservasController.list); // listar reservas

export default r;
