export default class CategoryNotExistException extends Error {
  constructor(message = 'Category does not exist') {
    super(message);
    this.name = 'CategoryNotExistException';
  }
}
