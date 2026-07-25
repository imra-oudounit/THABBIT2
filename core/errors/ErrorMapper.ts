import { AppError } from "./AppError";

export const ErrorMapper = {
  map(error: unknown): AppError {
    return AppError.fromUnknown(error);
  }
};