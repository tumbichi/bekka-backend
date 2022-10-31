import Product from "../models/Product";

export default interface GetProductsOnStock {
  getProductsOnStock: () => Promise<Product[]>;
}
