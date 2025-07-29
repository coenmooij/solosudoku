export class NoOptionsException extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'NoOptionsException';
  }
}
