import StoreNotExistException from '../../../Product/application/exeption/StoreNotExistException';
import UserService from '../../../User/application/service/UserService';
import Role from '../../../User/domain/model/Role';
import User from '../../../User/domain/model/User';
import Store from '../../domain/models/Store';
import StoreCreateDTO from '../dto/StoreCreateDTO';
import InvalidUserException from '../exception/InvalidUserException';
import UnauthorizedException from '../exception/UnauthorizedException';
import StoreRepositoryPort from '../repository/StoreRepository';

export default class StoreService {
  private readonly storeRepository: StoreRepositoryPort;
  private readonly userService: UserService;

  constructor(storeRepository: StoreRepositoryPort, userService: UserService) {
    this.storeRepository = storeRepository;
    this.userService = userService;
  }

  /**
   * createStore
   * @throws {Error}
   * @throws {InvalidUserException}
   * @throws {UnauthorizedException}
   */
  async createStore(storeCreateDto: StoreCreateDTO): Promise<Store> {
    let user: User | null;

    try {
      user = await this.userService.getUserById(storeCreateDto.userId);
    } catch (error) {
      throw new InvalidUserException();
    }

    if (user.role !== Role.ADMIN) {
      throw new UnauthorizedException();
    }

    return await this.storeRepository.createStore(storeCreateDto.userId);
  }

  async getStoreById(storeId: number): Promise<Store> {
    try {
      return await this.storeRepository.getStoreById(storeId);
    } catch (e) {
      throw new StoreNotExistException();
    }
  }
}
