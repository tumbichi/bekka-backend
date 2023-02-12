import InvalidCategoryTitleException from '../exception/InvalidCategoryTitleException';

export default class Category {
  title: string;
  id?: number;

  constructor(title: string, id?: number) {
    if (!title || title.length < 2) {
      throw new InvalidCategoryTitleException();
    }

    this.title = title;
    this.id = id;
  }
}
