import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserDocument, UserDto, UpdateUserInput } from './users.dto';
import { FilterQuery, Model } from 'mongoose';
import { SignUpInput } from '../auth/auth.dto';

/**
 * Service for users, contains all ops
 */
@Injectable()
export class UsersService {
  constructor(
    @Inject('User')
    private clientModel: Model<UserDocument>,
  ) {}

  async getAllUsers(filters: FilterQuery<any>): Promise<UserDto[]> {
    // Filter should be passed as well
    const users = await this.clientModel.find(filters);

    return users.map((t) => this.convertToDto(t));
  }

  async getUser(id: string): Promise<UserDto> {
    const user = await this.clientModel.findById(id);

    if (!user) {
      throw new NotFoundException(`User with id=${id} not found`);
    }
    return this.convertToDto(user);
  }

  async getUserByUsername(name: string): Promise<UserDocument> {
    const user = await this.clientModel.findOne({ name });

    if (!user) {
      throw new NotFoundException(`User with name=${name} not found`);
    }
    return user;
  }

  async createUser(user: SignUpInput): Promise<UserDto> {
    // Need to check is name and email is available
    await this.checkNameIsAvailable(user.name);

    const created = await this.clientModel.create(user);
    return this.convertToDto(created);
  }

  async updateUser(id: string, user: UpdateUserInput): Promise<UserDto> {
    const result = await this.clientModel.findOneAndUpdate({ id }, user, {
      new: true,
    });
    return this.convertToDto(result);
  }

  async deleteUser(id: string): Promise<void> {
    await this.clientModel.deleteOne({ id });
  }

  private convertToDto(t: UserDocument): UserDto {
    return {
      id: t.id,
      name: t.name,
      email: t.email,
      roles: t.roles,
      createdAt: t.createdAt,
      updatedAt: t.updatedAt,
    };
  }

  private async checkNameIsAvailable(name: string): Promise<void> {
    const user = await this.clientModel.findOne({ name });
    if (user) {
      throw new BadRequestException(`User with name ${name} already exists`);
    }
  }
}
