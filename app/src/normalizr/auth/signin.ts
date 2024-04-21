import { BadInitializationError } from '../../modules/Errors';

export interface Signin {
  message: string;
  token: string;
}

abstract class AbstractSignin implements Signin {
  readonly message: string;
  readonly token: string;

  constructor(data: Signin) {
    this.message = data.message;
    this.token = data.token;
  }
}

class SigninRead extends AbstractSignin {
  declare readonly token: string;
  constructor(data: Signin) {
    super(data);
    if (!this.token) {
      throw new BadInitializationError();
    }
  }
}

export class SigninFactory {
  static createSignin(data: Signin): SigninRead {
    return new SigninRead(data);
  }
}
