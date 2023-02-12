import User from '../../domain/model/User';

export default interface UserRepository {
  createUser: (user: User) => Promise<User>;
  getUserById: (id: number) => Promise<User>;
  getUserByEmail: (email: string) => Promise<User | null>;
}
