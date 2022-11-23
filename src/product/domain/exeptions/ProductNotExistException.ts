export default class ProductNotExistException extends Error {
  constructor(message = 'Product does not exist') {
    super(message);
    this.name = 'ProductNotExistException';
  }
}
