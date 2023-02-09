import { User } from '@prisma/client';
import Product from '../../../Product/domain/model/Product';

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
