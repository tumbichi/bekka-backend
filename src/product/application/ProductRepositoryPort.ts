import Product from '../domain/models/Product';

export default interface ProductRepositoryPort {
  createProduct: (product: Product) => Promise<Product>;
  deleteProductById: (productId: number) => Promise<Product>;
  editProduct: (product: Partial<Product>) => Promise<Product>;
  getProductById: (productId: number) => Promise<Product>;
  getProductsOnStock: () => Promise<Product[]>;
  getAllProducts: () => Promise<Product[]>;
}
