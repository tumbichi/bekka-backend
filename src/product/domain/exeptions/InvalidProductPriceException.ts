export default class InvalidProductPriceException extends Error {
  constructor(message = 'Invalid price') {
    super(message);
    this.name = 'InvalidProductPriceException';
  }
}
