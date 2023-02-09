import CategoryService from '../../../Category/application/service/CategoryService';
import StoreService from '../../../store/application/StoreService';
import CategoryNotExistException from '../../../Category/application/exeption/CategoryNotExistException';
import InvalidProductPriceException from '../exeption/InvalidProductPriceException';
import StoreNotExistException from '../exeption/StoreNotExistException';
import Product from '../../domain/model/Product';
import ProductCreationDTO from '../../infrastructure/dto/ProductCreationDTO';
import ProductRepositoryPort from '../repository/ProductRepository';
import InvalidImageUrlException from '../exeption/InvalidImageUrlException';
import validateUrl from '../../../Shared/validateUrl';
import InvalidProductTitleException from '../exeption/InvalidProductTitleException';
import ProductNotExistException from '../exeption/ProductNotExistException';

const validateProductCreationDTO = (productDto: ProductCreationDTO) => {
  if (!productDto.title || productDto.title.length < 2) {
    const msg = productDto.title.length ? 'The product name must be at least two characters long' : undefined;
    // return res.status(400).send('Product not valid');
    throw new InvalidProductTitleException(msg);
  }

  if (!productDto.price || typeof productDto.price !== 'number') {
    const msg = typeof productDto.price !== 'number' ? 'Price must be numerical' : undefined;
    // return res.status(400).send('price not valid');
    throw new InvalidProductPriceException(msg);
  }

  const isValidUrl = validateUrl(productDto.imageUrl);
  if (!productDto.imageUrl || !isValidUrl) {
    const msg = productDto.imageUrl ? 'The product image url is not a valid url' : undefined;
    // return res.status(400).send('Product not valid');
    throw new InvalidImageUrlException(msg);
  }

  if (!productDto.categoryId || typeof productDto.categoryId !== 'number') {
    // return res.status(400).send('Category not valid');
    throw new CategoryNotExistException();
  }

  if (!productDto.storeId || typeof productDto.storeId !== 'number') {
    // return res.status(400).send('Category not valid');
    throw new StoreNotExistException();
  }
};

class ProductService {
  private productRepository: ProductRepositoryPort;
  private categoryService: CategoryService;
  private storeService: StoreService;

  constructor(productRepository: ProductRepositoryPort, categoryService: CategoryService, storeService: StoreService) {
    this.productRepository = productRepository;
    this.categoryService = categoryService;
    this.storeService = storeService;
  }

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
