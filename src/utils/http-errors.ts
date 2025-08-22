export class HttpError extends Error {
  status: number;
  details?: unknown;

  constructor(status: number, message: string, details?: unknown) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

export const BadRequest = (msg: string, details?: unknown) =>
  new HttpError(400, msg, details);
export const NotFound = (msg: string) => new HttpError(404, msg);
export const Conflict = (msg: string) => new HttpError(409, msg);
