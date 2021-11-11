export abstract class CustomError extends Error {
  public statusCode: number = 400;

  constructor(message: string) {
    super(message);
  }

  get serialize() {
    return {
      name: this.name,
      message: this.message,
      statusCode: this.statusCode,
    };
  }
}

export class ShortenerUrlNotFoundError extends CustomError {
  public statusCode = 404;
  constructor(id: string) {
    super(`Shortener URL ${id} not found.`);
  }
}


export class InvalidUrlError extends CustomError {
  public statusCode = 404;
  constructor(url: string) {
    super(`Invalid URL: ${url}.`);
  }
}
