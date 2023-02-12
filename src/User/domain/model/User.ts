import Role from './Role';
import InvalidEmailException from '../exception/InvalidEmailException';
import validateEmail from '../../../Shared/validateEmail';

/**
 * User model
 * @throws {InvalidEmailException}
 *
 */
export default class User {
  name: string;
  email: string;
  role: Role;
  id?: number;

  constructor(name: string, email: string, role: Role, id?: number) {
    if (!validateEmail(email)) {
      throw new InvalidEmailException();
    }

    this.name = name;
    this.email = email;
    this.role = role;
    this.id = id;
  }
}
