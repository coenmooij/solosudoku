export class UnsolvableException extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'UnsolvableException';
  }
}
