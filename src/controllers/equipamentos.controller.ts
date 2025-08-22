import { Request, Response, NextFunction } from "express";
import { EquipamentosService } from "../services/equipamentos.service";

export const EquipamentosController = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const out = await EquipamentosService.create(req.body);
      res.status(201).json(out);
    } catch (e) {
      next(e);
    }
  },
  list: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const out = await EquipamentosService.list({
        tipoId: req.query.tipoId ? Number(req.query.tipoId) : undefined,
        status: req.query.status as any,
        incluirInativos: req.query.incluirInativos === "1",
        nome: req.query.nome as string | undefined,
      });
      res.json(out);
    } catch (e) {
      next(e);
    }
  },
  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const out = await EquipamentosService.get(Number(req.params.id));
      res.json(out);
    } catch (e) {
      next(e);
    }
  },
  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const out = await EquipamentosService.update(
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
      const out = await EquipamentosService.softDelete(
        Number(req.params.id),
        req.body?.updated_by
      );
      res.json(out);
    } catch (e) {
      next(e);
    }
  },
};
