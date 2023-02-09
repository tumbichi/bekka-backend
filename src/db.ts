import {
  Prisma,
  PrismaClient,
  Category as CategoryEntity,
  Product as ProductEntity,
  Store as StoreEntity,
  User as UserEntity,
} from '@prisma/client';

export { CategoryEntity, ProductEntity, StoreEntity, UserEntity, Prisma };

export const prisma = new PrismaClient({ log: ['query'] });
