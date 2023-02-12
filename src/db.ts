import {
  Prisma,
  PrismaClient,
  Category as CategoryEntity,
  Image as ImageEntity,
  Product as ProductEntity,
  Store as StoreEntity,
  User as UserEntity,
} from '@prisma/client';

export { CategoryEntity, ImageEntity, ProductEntity, StoreEntity, UserEntity, Prisma };

export const prisma = new PrismaClient({ log: ['error'] });
