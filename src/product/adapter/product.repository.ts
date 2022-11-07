import { CategoryEntity, prisma, ProductEntity } from '../../db';
import Product from '../domain/models/Product';
import GetProductsOnStock from '../domain/usecases/GetProductsOnStock';

class ProductAdapter implements GetProductsOnStock {
  private productRepository = prisma.product;

  getProductsOnStock = async (): Promise<Product[]> => {
    try {
      const productsEntity = await this.productRepository.findMany({
        include: { category: true },
      });

      const products = await Promise.all(
        productsEntity.map(async (productEntity): Promise<Product> => {
          return parseProductEntityToDomain(productEntity);
        }),
      );

      return products;
    } catch (e) {
      // TODO: handle error
      console.error('Error getProductsOnStock', e);
      throw e;
    }
  };
}

const parseProductEntityToDomain = (
  product: ProductEntity & {
    category: CategoryEntity;
  },
): Product =>
  new Product(
    product.id,
    product.title,
    product.imageUrl,
    product.price.toNumber(),
    product.stock,
    product.active,
    product.count,
    product.category,
    product.description !== null ? product.description : undefined,
  );

export default ProductAdapter;
