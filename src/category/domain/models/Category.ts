export default class Category {
  title: string;
  id?: number;

  constructor(title: string, id?: number) {
    this.title = title;
    this.id = id;
  }
}
