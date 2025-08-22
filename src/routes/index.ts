import { Router } from "express";
import equipamentos from "./equipamentos.routes";
import funcionarios from "./funcionarios.routes";
import reservas from "./reservations.routes";
import tipos from "./tipo-equipamento.routes"; // opcional: se você criou o CRUD de tipos

const r = Router();

r.get("/health", (_req, res) => res.json({ ok: true }));

r.use("/equipamentos", equipamentos);
r.use("/funcionarios", funcionarios);
r.use("/reservas", reservas);
r.use("/tipos", tipos); // comente/remova se não estiver usando tipos

export default r;
