import Category from '../../../category/domain/model/Category';
import Store from '../../../Store/domain/models/Store';

class Product {
  title: string;
  imageUrl: string;
  price: number;
  description?: string;
  stock: boolean;
  active: boolean;
  count: number;
  category: Category;
  store: Store;
  id?: number;

  constructor(
    title: string,
    imageUrl: string,
    price: number,
    stock: boolean,
    active: boolean,
    count: number,
    category: Category,
    store: Store,
    id?: number,
    description?: string,
  ) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
    this.stock = stock;
    this.active = active;
    this.count = count;
    this.category = category;
    this.store = store;
  }
}

export default Product;
