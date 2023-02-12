import { Prisma, StoreEntity } from '../../../../db';
import StoreRepository from '../../application/repository/StoreRepository';
import Store from '../../domain/models/Store';

export default class StoreDataSource implements StoreRepository {
  private readonly storeRepository;

  constructor(prismaRepository: Prisma.StoreDelegate<'rejectOnNotFound'>) {
    this.storeRepository = prismaRepository;
  }
  createStore = async (userId: number): Promise<Store> => {
    try {
      const storeEntity = await this.storeRepository.create({ data: { userId } });
      return this.parseStoreEntityToDomain(storeEntity);
    } catch (error) {
      throw new Error('Failed when create store');
    }
  };

  async getStoreById(id: number): Promise<Store> {
    try {
      const storeEntity = await this.storeRepository.findUniqueOrThrow({ where: { id } });
      return this.parseStoreEntityToDomain(storeEntity);
    } catch (e) {
      console.error('ERROR_StoreRepository', e);
      throw new Error("Store doesn't exists");
    }
  }

  private parseStoreEntityToDomain(storeEntity: StoreEntity): Store {
    return new Store(storeEntity.id);
  }
}
