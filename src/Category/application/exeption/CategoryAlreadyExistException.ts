export default class CategoryAlreadyExistException extends Error {
  constructor(message = 'Category allready exists') {
    super(message);
    this.name = 'CategoryAlreadyExistException';
  }
}
