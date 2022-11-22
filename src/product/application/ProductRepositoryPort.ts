import Product from '../domain/models/Product';

export default interface ProductRepositoryPort {
  createProduct: (product: Product) => Promise<Product>;
  editProduct: (product: Partial<Product>) => Promise<Product>;
  getProductsOnStock: () => Promise<Product[]>;
}
