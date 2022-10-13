import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserEntity } from './users.dto';
import { databaseProviders } from '../db/db.provider';

const users: UserEntity[] = [
  {
    name: 'whatever',
    email: 'test@email.com',
    roles: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: '',
    email: 'any',
    roles: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue({})
      .overrideProvider(databaseProviders)
      .useValue({})
      .compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  afterAll(async () => {
    await module.close();
  });

  describe('find all users', () => {
    it('should find all users', async () => {
      usersService.getAllUsers = jest.fn().mockResolvedValue(users);
      expect(await usersController.getAllUsers()).toBe(users);
      expect(usersService.getAllUsers).toBeCalledWith({});
    });
  });

  describe('find user by id', () => {
    it('should find user by id', async () => {
      usersService.getUser = jest.fn().mockResolvedValue(users[0]);
      expect(await usersController.getUserById('0')).toBe(users[0]);
      expect(usersService.getUser).toBeCalledWith('0');
    });
  });

  describe('update user by id', () => {
    it('update find user by id', async () => {
      usersService.updateUser = jest.fn().mockResolvedValue(users[0]);
      expect(await usersController.updateUserById('0', users[0])).toBe(
        users[0],
      );
      expect(usersService.updateUser).toBeCalledWith('0', users[0]);
    });
  });

  describe('delete user by id', () => {
    it('should find user by id', async () => {
      usersService.deleteUser = jest.fn();
      expect(await usersController.deleteUserById('0')).toBe(undefined);
      expect(usersService.deleteUser).toBeCalledWith('0');
    });
  });
});
