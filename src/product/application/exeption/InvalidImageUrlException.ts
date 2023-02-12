export default class InvalidImageUrlException extends Error {
  constructor(message = 'Invalid image url') {
    super(message);
    this.name = 'InvalidImageUrlException';
  }
}
