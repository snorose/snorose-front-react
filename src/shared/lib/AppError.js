export class AppError extends Error {
  #code = null;

  constructor(code, message = '') {
    super(message);
    this.name = 'AppError';
    this.code = code;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
