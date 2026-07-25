import { AppError } from "./AppError";

export class NetworkError extends AppError {
  constructor(message?: string, cause?: unknown) {
    super("network/unreachable", message, cause);
    this.name = "NetworkError";
  }
}