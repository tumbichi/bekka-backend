export default class StoreNotExistException extends Error {
  constructor(message = 'Store does not exist') {
    super(message);
    this.name = 'StoreNotExistException';
  }
}
