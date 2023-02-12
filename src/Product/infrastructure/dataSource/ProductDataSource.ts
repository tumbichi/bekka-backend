import { CategoryEntity, prisma, ProductEntity, StoreEntity } from '../../../db';
import ProductRepository from '../../application/repository/ProductRepository';
import Product from '../../domain/model/Product';
import Category from '../../../Category/domain/model/Category';
import Store from '../../../Store/domain/models/Store';

class ProductDataSource implements ProductRepository {
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
      console.error('DataSource ProductCreateError', e);
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
      console.error('ErrorRepository_getProductsOnStock', e);
      throw e;
    }
  }

  async editProduct(product: Partial<Product>, productId: number): Promise<Product> {
    try {
      const productEntity = await this.productRepository.update({
        data: {
          title: product.title,
          description: product.description,
          price: product.price,
          category: { connect: { id: product.category?.id } },
          store: { connect: { id: product.store?.id } },
          imageUrl: product.imageUrl,
          active: product.active,
          count: product.count,
          stock: product.stock,
        },
        where: {
          id: productId,
        },
        include: { category: true, store: true },
      });
      return parseProductEntityToDomain(productEntity);
    } catch (error) {
      console.error('[ProductRepository] Update product by id failed: ', error);
      throw new Error('Failed updating product');
    }
  }

  async getAllProducts(): Promise<Product[]> {
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
      console.error('[ProductRepository] Get all products failed: ', e);
      throw new Error('Failed getting all products');
    }
  }

  async deleteProductById(id: number): Promise<Product> {
    try {
      const productDeleted = await this.productRepository.delete({
        where: { id },
        include: { category: true, store: true },
      });

      return parseProductEntityToDomain(productDeleted);
    } catch (error) {
      console.error('[ProductRepository] Delete product by id failed: ', error);
      throw new Error('Failed deleting product');
    }
  }

  async getProductById(id: number): Promise<Product> {
    try {
      const productEntity = await this.productRepository.findUniqueOrThrow({
        where: { id },
        include: { category: true, store: true },
      });

      return parseProductEntityToDomain(productEntity);
    } catch (e) {
      console.error('ErrorRepository_getProductById', e);
      console.error('[ProductRepository] Get product by id failed: ', e);
      throw new Error('Failed geting product by id');
    }
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

export default ProductDataSource;
