import Product from '../../domain/model/Product';

export default interface ProductRepository {
  createProduct: (product: Product) => Promise<Product>;
  deleteProductById: (productId: number) => Promise<Product>;
  editProduct: (product: Partial<Product>) => Promise<Product>;
  getProductById: (productId: number) => Promise<Product>;
  getProductsOnStock: () => Promise<Product[]>;
  getAllProducts: () => Promise<Product[]>;
}
