import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);

    console.log(user);

    if (!user) {
      return null;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    console.log('AuthService.validateUser', isMatch);

    if (!isMatch) {
      return null;
    }

    return user;
  }
}
