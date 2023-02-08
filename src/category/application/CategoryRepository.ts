import Category from '../domain/models/Category';

export default interface CategoryRepository {
  getCategoryById: (id: number) => Promise<Category>;
  getAllCategories: () => Promise<Category[]>;
}
