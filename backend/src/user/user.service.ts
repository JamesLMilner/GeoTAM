import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async findOne(email: string): Promise<User | undefined> {
    return this.userModel.findOne({
      where: {
        email,
      },
    });
  }
}
