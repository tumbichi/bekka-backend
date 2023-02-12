import { User } from '@prisma/client';
import Product from '../../../Product/domain/model/Product';

export default class Store {
  id?: number;
  user?: User;
  products?: Product[];

  constructor(id?: number, user?: User, products?: Product[]) {
    this.id = id;
    this.user = user;
    this.products = products;
  }
}
