import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { PasswordService } from 'src/password/password.service';
import { Repository } from 'typeorm';
import {
  createUserDto,
  user,
  users,
  updateUserDto,
  updatedUser,
} from './mock/mock-user';

describe('UsersService', () => {
  let userService: UsersService;
  let userRepository: Repository<UserEntity>;
  let passwordService: PasswordService;

  const mockUserRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const mockPasswordService = {
    hashPassword: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: mockUserRepository,
        },
        {
          provide: PasswordService,
          useValue: mockPasswordService,
        },
      ],
    }).compile();
    userService = module.get(UsersService);
    userRepository = module.get(getRepositoryToken(UserEntity));
    passwordService = module.get(PasswordService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  // create user
  describe('create', () => {
    it('should hash the password, create and save the user', async () => {
      jest
        .spyOn(passwordService, 'hashPassword')
        .mockResolvedValue('hashed_abcdef');
      jest.spyOn(userRepository, 'create').mockReturnValue(user);
      jest.spyOn(userRepository, 'save').mockResolvedValue(user);

      const result = await userService.create(createUserDto);
      const { password, ...rest } = createUserDto;
      expect(passwordService.hashPassword).toHaveBeenCalledWith(password);
      expect(userRepository.create).toHaveBeenCalledWith({
        ...rest,
        password: 'hashed_abcdef',
      });
      expect(userRepository.save).toHaveBeenCalledWith(user);
      expect(result).toEqual(user);
    });
  });

  //get all users
  describe('findAll', () => {
    it('should return all users', async () => {
      jest.spyOn(userRepository, 'find').mockResolvedValue(users);
      const result = await userService.findAll();
      expect(result).toEqual(users);
    });
  });

  // get user by id
  describe('findById', () => {
    it('should return a user by id', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);
      const result = await userService.findById(1);
      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['role', 'groups'],
      });
      expect(result).toEqual(user);
    });
  });

  // get user by email
  describe('findByEmail', () => {
    it('should return a user by email', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);
      const result = await userService.findByEmail('john.doe@vonage.com');
      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { email: 'john.doe@vonage.com' },
        relations: ['role', 'groups'],
      });
      expect(result).toEqual(user);
    });
  });

  // update user
  describe('update', () => {
    it('should update a user', async () => {
      jest.spyOn(userRepository, 'update').mockResolvedValue(undefined);
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(updatedUser);

      const result = await userService.update(1, updateUserDto);
      expect(userRepository.update).toHaveBeenCalledWith(1, updateUserDto);
      expect(userRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toEqual(updatedUser);
    });
  });

  // remove a user
  describe('remove', () => {
    it('should remove a user by id', async () => {
      jest.spyOn(userRepository, 'delete').mockResolvedValue(undefined);
      await userService.remove(1);
      expect(userRepository.delete).toHaveBeenCalledWith(1);
    });
  });
});
