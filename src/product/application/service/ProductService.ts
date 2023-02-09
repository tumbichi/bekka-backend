import ProductNotExistException from '../exeption/ProductNotExistException';
import ProductRepositoryPort from '../repository/ProductRepository';
import Product from '../../domain/model/Product';
import ProductCreationDTO from '../../infrastructure/dto/ProductCreationDTO';
import validateProductCreationDTO from '../validator/validateProductCreationDTO';

import StoreService from '../../../Store/application/StoreService';

import CategoryService from '../../../Category/application/service/CategoryService';

class ProductService {
  private productRepository: ProductRepositoryPort;
  private categoryService: CategoryService;
  private storeService: StoreService;

  constructor(productRepository: ProductRepositoryPort, categoryService: CategoryService, storeService: StoreService) {
    this.productRepository = productRepository;
    this.categoryService = categoryService;
    this.storeService = storeService;
  }

  /**
   * Create product service
   * @throws {Error}
   * @throws {ProductNotExistException}
   * @throws {InvalidProductTitleException}
   * @throws {InvalidProductPriceException}
   * @throws {InvalidImageUrlException}
   * @throws {CategoryNotExistException}
   * @throws {StoreNotExistException}
   *
   */
  async createProduct(productDto: ProductCreationDTO): Promise<Product> {
    // if the validation fails throw with a business error
    validateProductCreationDTO(productDto);

    const category = await this.categoryService.getCategoryById(productDto.categoryId);

    const store = await this.storeService.getStoreById(productDto.storeId);

    const product = new Product(
      productDto.title,
      productDto.imageUrl,
      productDto.price,
      true,
      true,
      1,
      category,
      store,
    );

    try {
      const productCreated = await this.productRepository.createProduct(product);
      return productCreated;
    } catch (e) {
      console.error('Error_ProductService', e);
      throw new Error('Product creation error');
    }
  }

  async getProductById(id: number): Promise<Product> {
    try {
      return await this.productRepository.getProductById(id);
    } catch (e) {
      throw new ProductNotExistException();
    }
  }

  async getProductsOnStock() {
    try {
      return await this.productRepository.getProductsOnStock();
    } catch (e) {
      throw new Error('Error when try get products on stock');
    }
  }

  async getAllProducts() {
    try {
      return await this.productRepository.getAllProducts();
    } catch (e) {
      throw new Error('Error when try get all products');
    }
  }
}

export default ProductService;
