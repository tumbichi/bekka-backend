import Category from "../../../category/domain/models/Category";

class Product {
  id: number;
  title: string;
  imageUrl: string;
  price: number;
  description?: string;
  stock: boolean;
  active: boolean;
  count: number;
  category: Category;
  // store: Store;

  constructor(
    id: number,
    title: string,
    imageUrl: string,
    price: number,
    stock: boolean,
    active: boolean,
    count: number,
    category: Category,
    description?: string
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
  }
}

export default Product;
