import Product from '../models/Product';

export default interface ProductUseCases {
  createProduct: (product: Product) => Promise<Product>;
  editProduct: (product: Partial<Product>) => Product;
  getProductsOnStock: () => Promise<Product[]>;
}
