import Store from '../../domain/models/Store';

export default interface StoreRepositoryPort {
  createStore: (userId: number) => Promise<Store>;
  getStoreById: (id: number) => Promise<Store>;
}
