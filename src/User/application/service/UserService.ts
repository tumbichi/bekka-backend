import UserCreateAdminDTO from '../dto/UserCreateDTO';
import UserRepository from '../repository/UserRepository';
import User from '../../domain/model/User';
import Role from '../../domain/model/Role';
import UserAlreadyExistException from '../exception/UserAlreadyExistException';

/**
 * @throws {Error}
 * @throws {InvalidEmailException}
 * @throws {UserAlreadyExistException}
 */
export default class UserService {
  private readonly userRepository;

  constructor(repository: UserRepository) {
    this.userRepository = repository;
  }

  createUserAdmin = async (userCreateAdminDto: UserCreateAdminDTO) => {
    const user = new User(userCreateAdminDto.name, userCreateAdminDto.email, Role.ADMIN);

    const existingUser = await this.getUserByEmail(user.email);

    if (existingUser) {
      throw new UserAlreadyExistException();
    }

    return await this.userRepository.createUser(user);
  };

  getUserByEmail = async (email: string) => {
    return await this.userRepository.getUserByEmail(email);
  };

  getUserById = async (id: number) => {
    return await this.userRepository.getUserById(id);
  };
}
