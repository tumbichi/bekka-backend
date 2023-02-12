import CategoryNotExistException from '../exeption/CategoryNotExistException';
import Category from '../../domain/model/Category';
import CategoryCreationDTO from '../dto/CategoryCretionDTO';
import CategoryRepository from '../repository/CategoryRepository';
import CategoryAlreadyExistException from '../exeption/CategoryAlreadyExistException';
import CategoryUpdateDTO from '../dto/CategoryUpdateDTO';

export default class CategoryService {
  private readonly categoryRepository: CategoryRepository;

  constructor(categoryRepository: CategoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async createCategory(categoryDto: CategoryCreationDTO): Promise<Category> {
    const category = new Category(categoryDto.title);

    try {
      const existingCategory = await this.categoryRepository.getCategoryByTitle(category.title);
      if (existingCategory) {
        throw new CategoryAlreadyExistException();
      }
    } catch (e) {
      console.log('error', e);
    }

    try {
      return await this.categoryRepository.createCategory(category);
    } catch (e) {
      throw new Error('Category creation failed');
    }
  }

  async updateCategory(categoryUpdateDto: CategoryUpdateDTO): Promise<Category> {
    const category = new Category(categoryUpdateDto.title, categoryUpdateDto.id);

    return await this.categoryRepository.updateCategory(category);
  }

  async deleteCategory(id: number): Promise<Category> {
    return await this.categoryRepository.deleteCategory(id);
  }

  async getCategoryById(id: number): Promise<Category> {
    try {
      return await this.categoryRepository.getCategoryById(id);
    } catch (e) {
      throw new CategoryNotExistException();
    }
  }

  async getAllCategories(): Promise<Category[]> {
    try {
      return await this.categoryRepository.getAllCategories();
    } catch (e) {
      throw new Error('Unexpected error');
    }
  }
}
