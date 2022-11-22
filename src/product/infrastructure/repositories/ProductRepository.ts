import Category from '../../../category/domain/models/Category';
import { CategoryEntity, prisma, ProductEntity, StoreEntity } from '../../../db';
import Store from '../../../store/domain/models/Store';
import ProductRepositoryPort from '../../application/ProductRepositoryPort';
import Product from '../../domain/models/Product';

class ProductRepository implements ProductRepositoryPort {
  private productRepository = prisma.product;

  async createProduct(product: Product): Promise<Product> {
    try {
      const productEntity = await prisma.product.create({
        data: {
          title: product.title,
          price: product.price,
          description: product.description,
          imageUrl: product.imageUrl,
          // categoryId: product.category.id,
          // storeId: product.store.id,
          category: { connect: { id: product.category.id } },
          store: { connect: { id: product.store.id } },
          stock: product.stock,
          active: product.active,
        },
      });
      return parseProductEntityToDomain({
        ...productEntity,
        category: product.category,
        store: product.store,
      });
      // return res.status(201).json(product);
    } catch (e) {
      console.error('ProductCreateError', e);
      // res.status(500).json(e);
      throw new Error('Product create error');
    }
  }

  async getProductsOnStock(): Promise<Product[]> {
    try {
      const productsEntity = await this.productRepository.findMany({
        include: { category: true, store: true },
      });

      const products = await Promise.all(
        productsEntity.map(async (productEntity): Promise<Product> => {
          return parseProductEntityToDomain({
            ...productEntity,
            category: productEntity.category,
            store: productEntity.store,
          });
        }),
      );

      return products;
    } catch (e) {
      // TODO: handle error
      console.error('Error getProductsOnStock', e);
      throw e;
    }
  }

  async editProduct(product: Partial<Product>): Promise<Product> {
    console.log('product :>> ', product);
    return Promise.resolve({} as Product);
  }
}

const parseProductEntityToDomain = (
  product: ProductEntity & {
    category: CategoryEntity | Category;
    store: StoreEntity | Store;
  },
): Product =>
  new Product(
    product.title,
    product.imageUrl,
    product.price.toNumber(),
    product.stock,
    product.active,
    product.count,
    new Category(product.category.title, product.category.id),
    new Store(product.store.id),
    product.id,
    product.description !== null ? product.description : undefined,
  );

export default ProductRepository;
