export default class UnauthorizedException extends Error {
  constructor(message = 'You not have permission') {
    super(message);
    this.name = 'UnauthorizedException';
  }
}
