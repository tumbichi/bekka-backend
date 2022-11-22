import {
  PrismaClient,
  Category as CategoryEntity,
  Product as ProductEntity,
  Store as StoreEntity,
} from '@prisma/client';

export { CategoryEntity, ProductEntity, StoreEntity };

export const prisma = new PrismaClient({ log: ['query'] });
