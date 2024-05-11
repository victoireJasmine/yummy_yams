import { BadInitializationError } from '../../modules/Errors';

export interface User {
  _id: string;  
  name: string;
  email: string;
}

abstract class AbstractUser implements User {
  readonly _id: string;  
  readonly name: string;
  readonly email: string;

  constructor(data: User) {
    this._id = data._id;
    this.name = data.name;
    this.email = data.email;
  }
}

class UserRead extends AbstractUser {
  declare readonly email: string;
  constructor(data: User) {
    super(data);
    if (!this.email) {
      throw new BadInitializationError();
    }
  }
}

export class UserFactory {
  static createUser(data: User): UserRead {
    return new UserRead(data);
  }
}
