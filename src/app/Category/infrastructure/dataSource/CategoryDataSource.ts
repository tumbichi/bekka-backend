import { CategoryEntity, Prisma } from '../../../../db';
import CategoryRepository from '../../application/repository/CategoryRepository';
import Category from '../../domain/model/Category';

export default class CategoryDataSource implements CategoryRepository {
  private readonly categoryClient;

  constructor(prismaClient: Prisma.CategoryDelegate<'rejectOnNotFound'>) {
    this.categoryClient = prismaClient;
  }

  async createCategory(category: Category): Promise<Category> {
    try {
      const categoryEntity = await this.categoryClient.create({ data: { title: category.title } });
      return this.parseCategoryEntityToDomain(categoryEntity);
    } catch (e) {
      console.error('[DataSource] Error on create category', e);
      throw new Error('Create category failed');
    }
  }

  async updateCategory(category: Partial<Category>): Promise<Category> {
    try {
      const updatedProduct = await this.categoryClient.update({
        data: {
          title: category.title,
        },
        where: { id: category.id },
      });
      return this.parseCategoryEntityToDomain(updatedProduct);
    } catch (e) {
      console.error('[DataSource] Error on update category', e);
      throw new Error('Update category failed');
    }
  }

  async deleteCategory(id: number): Promise<Category> {
    try {
      const categoryEntity = await this.categoryClient.delete({
        where: { id },
      });
      return this.parseCategoryEntityToDomain(categoryEntity);
    } catch (e) {
      console.error('[DataSource] Error on delete category', e);
      throw Error('Delete category failed');
    }
  }

  async getCategoryById(id: number) {
    try {
      const categoryEntity = await this.categoryClient.findUniqueOrThrow({
        where: { id },
      });

      return this.parseCategoryEntityToDomain(categoryEntity);
    } catch (e) {
      console.error('[DataSource] Error on getCategoryById', e);
      throw new Error('Category not exists');
    }
  }

  async getCategoryByTitle(title: string): Promise<Category | null> {
    try {
      const existingCategory = await this.categoryClient.findUnique({
        where: { title },
      });

      return existingCategory ? this.parseCategoryEntityToDomain(existingCategory) : null;
    } catch (e) {
      console.error('[DataSource] Error on getCategoryByTitle', e);
      throw new Error('Unexpected error');
    }
  }

  async getAllCategories() {
    try {
      const categoriesEntity = await this.categoryClient.findMany();

      return categoriesEntity.map((categoryEntity) => this.parseCategoryEntityToDomain(categoryEntity));
    } catch (e) {
      console.error('[DataSource] Error on getAllCategories', e);
      throw e;
    }
  }

  private parseCategoryEntityToDomain = (categoryEntity: CategoryEntity): Category =>
    new Category(categoryEntity.title, categoryEntity.id);
}
