import { Request, Response, NextFunction } from "express";
import { TipoEquipamentoService } from "../services/tipo-equipamento.service";

export const TipoEquipamentoController = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const out = await TipoEquipamentoService.create(req.body);
      res.status(201).json(out);
    } catch (e) {
      next(e);
    }
  },
  list: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const out = await TipoEquipamentoService.list();
      res.json(out);
    } catch (e) {
      next(e);
    }
  },
  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const out = await TipoEquipamentoService.get(Number(req.params.id));
      res.json(out);
    } catch (e) {
      next(e);
    }
  },
  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const out = await TipoEquipamentoService.update(
        Number(req.params.id),
        req.body
      );
      res.json(out);
    } catch (e) {
      next(e);
    }
  },
  softDelete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const out = await TipoEquipamentoService.softDelete(
        Number(req.params.id),
        req.body?.updated_by
      );
      res.json(out);
    } catch (e) {
      next(e);
    }
  },
};
