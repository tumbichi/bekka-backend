import { Prisma, UserEntity } from '../../../../db';
import UserRepository from '../../application/repository/UserRepository';
import Role from '../../domain/model/Role';
import User from '../../domain/model/User';

export default class UserDataSource implements UserRepository {
  private userClient: Prisma.UserDelegate<'rejectOnNotFound'>;

  constructor(prismaClient: Prisma.UserDelegate<'rejectOnNotFound'>) {
    this.userClient = prismaClient;
  }

  createUser = async (user: User) => {
    try {
      const userEntity = await this.userClient.create({
        data: {
          email: user.email,
          name: user.name,
          role: Role[user.role],
        },
      });
      return this.parseUserEntityToDomain(userEntity);
    } catch (error) {
      throw new Error('Failed when try create user');
    }
  };
  getUserById = async (id: number) => {
    try {
      const userEntity = await this.userClient.findUniqueOrThrow({ where: { id } });
      return this.parseUserEntityToDomain(userEntity);
    } catch (error) {
      throw new Error('Failed when try find user by id');
    }
  };
  getUserByEmail = async (email: string) => {
    try {
      const userEntity = await this.userClient.findUnique({ where: { email } });
      return userEntity !== null ? this.parseUserEntityToDomain(userEntity) : null;
    } catch (error) {
      throw new Error('Failed when try find user by email');
    }
  };

  private parseUserEntityToDomain = (userEntity: UserEntity): User =>
    new User(userEntity.name, userEntity.email, Role[userEntity.role], userEntity.id);
}
