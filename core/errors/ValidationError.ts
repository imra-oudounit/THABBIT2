import { AppError } from "./AppError";

export class ValidationError extends AppError {
  constructor(message?: string, cause?: unknown) {
    super("unknown", message, cause);
    this.name = "ValidationError";
  }
}