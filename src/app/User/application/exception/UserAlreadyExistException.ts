export default class UserAlreadyExistException extends Error {
  constructor(message = 'User allready exists') {
    super(message);
    this.name = 'UserAlreadyExistException';
  }
}
