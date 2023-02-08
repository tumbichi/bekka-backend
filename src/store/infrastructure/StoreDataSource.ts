import { prisma, StoreEntity } from '../../db';
import StoreRepository from '../application/StoreRepository';
import Store from '../domain/models/Store';

export default class StoreDataSource implements StoreRepository {
  private storeRepository = prisma.store;

  async getStoreById(id: number): Promise<Store> {
    try {
      const storeEntity = await this.storeRepository.findUniqueOrThrow({ where: { id } });
      return this.parseStoreEntityToDomain(storeEntity);
    } catch (e) {
      console.error('ERROR_StoreRepository', e);
      throw new Error("Store doesn't exists");
    }

    // return new Store([], );
  }

  private parseStoreEntityToDomain(storeEntity: StoreEntity): Store {
    return new Store(storeEntity.id);
  }
}
