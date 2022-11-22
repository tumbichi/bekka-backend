export default class InvalidProductTitleException extends Error {
  constructor(message = 'Invalid product title') {
    super(message);
    this.name = 'InvalidProductTitleException';
  }
}
