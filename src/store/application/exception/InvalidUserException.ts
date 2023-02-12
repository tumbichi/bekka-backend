export default class InvalidUserException extends Error {
  constructor(message = 'Invalid user') {
    super(message);
    this.name = 'InvalidUserException';
  }
}
