import { User } from '@prisma/client';
import Product from '../../../product/domain/models/Product';

export default class Store {
  id?: number;
  products?: Product[];
  user?: User;

  constructor(id?: number, products?: Product[], user?: User) {
    this.id = id;
    this.products = products;
    this.user = user;
  }
}
