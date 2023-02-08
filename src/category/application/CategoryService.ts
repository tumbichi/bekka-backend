import CategoryNotExistException from '../domain/exeptions/CategoryNotExistException';
import Category from '../domain/models/Category';
import CategoryRepository from './CategoryRepository';

export default class CategoryService {
  private readonly categoryRepository: CategoryRepository;

  constructor(categoryRepository: CategoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async getCategoryById(id: number): Promise<Category> {
    try {
      return await this.categoryRepository.getCategoryById(id);
    } catch (e) {
      console.error('ErrorService_getCategoryById :>> ', e);
      throw new CategoryNotExistException();
    }
  }

  async getAllCategories(): Promise<Category[]> {
    try {
      return await this.categoryRepository.getAllCategories();
    } catch (e) {
      console.error('ErrorService_getAllCategories', e);
      throw new Error('Unexpected error');
    }
  }
}
