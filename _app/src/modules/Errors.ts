export class BadInitializationError extends Error {}

export class NetworkError {
  private readonly message: string;

  constructor(err: Error, message?: string | null) {
    this.message = message ?? err.message;
  }

  toString(): string {
    return this.message;
  }
}
