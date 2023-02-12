export default class InvalidCategoryTitleException extends Error {
  constructor(message = 'Invalid category title') {
    super(message);
    this.name = 'InvalidCategoryTitleException';
  }
}
