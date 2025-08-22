import { Request, Response, NextFunction } from "express";
import { HttpError } from "../utils/http-errors";

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof HttpError) {
    return res
      .status(err.status)
      .json({ error: err.message, details: err.details ?? null });
  }
  console.error("[UNHANDLED]", err);
  return res.status(500).json({ error: "Erro interno do servidor" });
}
