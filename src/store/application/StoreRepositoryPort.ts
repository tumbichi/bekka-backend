import Store from '../domain/models/Store';

export default interface StoreRepositoryPort {
  getStoreById: (id: number) => Promise<Store>;
}
