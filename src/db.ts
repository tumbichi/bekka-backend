import { PrismaClient, Category as CategoryEntity, Product as ProductEntity } from '@prisma/client';

export { CategoryEntity, ProductEntity };

export const prisma = new PrismaClient({ log: ['query'] });
