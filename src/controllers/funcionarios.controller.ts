import { Request, Response, NextFunction } from "express";
import { FuncionariosService } from "../services/funcionarios.service";

export const FuncionariosController = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const out = await FuncionariosService.create(req.body);
      res.status(201).json(out);
    } catch (e) {
      next(e);
    }
  },
  list: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const out = await FuncionariosService.list({
        nome: req.query.nome as string | undefined,
        incluirInativos: req.query.incluirInativos === "1",
      });
      res.json(out);
    } catch (e) {
      next(e);
    }
  },
  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const out = await FuncionariosService.get(Number(req.params.id));
      res.json(out);
    } catch (e) {
      next(e);
    }
  },
  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const out = await FuncionariosService.update(
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
      const out = await FuncionariosService.softDelete(
        Number(req.params.id),
        req.body?.updated_by
      );
      res.json(out);
    } catch (e) {
      next(e);
    }
  },
};
