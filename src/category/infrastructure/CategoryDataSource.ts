import { NotFoundError } from '@prisma/client/runtime';
import { CategoryEntity, prisma } from '../../db';
import CategoryRepository from '../application/CategoryRepository';
import Category from '../domain/models/Category';

export default class CategoryDataSource implements CategoryRepository {
  private categoryRepository = prisma.category;

  async getCategoryById(id: number) {
    try {
      const categoryEntity = await this.categoryRepository.findUniqueOrThrow({
        where: { id },
      });

      return this.parseCategoryEntityToDomain(categoryEntity);
    } catch (e) {
      console.error('ErrorRepository_getCategoryById', e);
      throw new Error('Category not exists');
    }
  }

  async getAllCategories() {
    try {
      const categoriesEntity = await prisma.category.findMany();

      return categoriesEntity.map((categoryEntity) => this.parseCategoryEntityToDomain(categoryEntity));
    } catch (e) {
      console.error('ErrorRepository_getAllCategories', e);
      throw e;
    }
  }

  private parseCategoryEntityToDomain = (categoryEntity: CategoryEntity): Category =>
    new Category(categoryEntity.title, categoryEntity.id);
}
