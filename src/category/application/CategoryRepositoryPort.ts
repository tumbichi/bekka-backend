import Category from '../domain/models/Category';

export default interface CategoryRepositoryPort {
  getCategoryById: (id: number) => Promise<Category>;
  getAllCategories: () => Promise<Category[]>;
}
