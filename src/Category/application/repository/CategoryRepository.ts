import Category from '../../domain/model/Category';

export default interface CategoryRepository {
  createCategory: (category: Category) => Promise<Category>;
  deleteCategory: (id: number) => Promise<Category>;
  updateCategory: (category: Category) => Promise<Category>;
  getCategoryById: (id: number) => Promise<Category>;
  getCategoryByTitle: (title: string) => Promise<Category | null>;
  getAllCategories: () => Promise<Category[]>;
}
