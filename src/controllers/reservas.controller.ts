import { Request, Response, NextFunction } from "express";
import { ReservasService } from "../services/reservas.service";

export const ReservasController = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const out = await ReservasService.criarReserva(req.body);
      res.status(201).json(out);
    } catch (e) {
      next(e);
    }
  },
  finish: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const out = await ReservasService.finalizarReserva(Number(req.params.id));
      res.json(out);
    } catch (e) {
      next(e);
    }
  },
  list: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const out = await ReservasService.listar();
      res.json(out);
    } catch (e) {
      next(e);
    }
  },
};
