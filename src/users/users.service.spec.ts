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
import { ConflictException, NotFoundException } from '@nestjs/common';

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
    softDelete: jest.fn(),
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

  afterEach(() => {
    jest.clearAllMocks();
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

    it('should throw a ConflictException if email already exists', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);
      await expect(userService.create(user)).rejects.toThrow(ConflictException);
    });
  });

  // get all users
  describe('findAll', () => {
    it('should return all users when users exists', async () => {
      jest.spyOn(userRepository, 'find').mockResolvedValue(users);
      const result = await userService.findAll();
      expect(result).toEqual(users);
    });

    it('should return an empty array when no user exist', async () => {
      jest.spyOn(userRepository, 'find').mockResolvedValue([]);
      const result = await userService.findAll();
      expect(result).toEqual([]);
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

    it('should throw NotFoundException when user is not found', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);
      await expect(userService.findById(100)).rejects.toThrow(
        NotFoundException,
      );
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

    it('should throw NotFoundException when user is not found', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);
      await expect(userService.findByEmail('john@vonage.com')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  // update user
  describe('update', () => {
    it('should update a user if user exists', async () => {
      jest
        .spyOn(userRepository, 'findOne')
        .mockResolvedValueOnce(user)
        .mockResolvedValueOnce(updatedUser);
      jest
        .spyOn(userRepository, 'update')
        .mockResolvedValue({ affected: 1 } as any);

      const result = await userService.update(1, updateUserDto);

      expect(userRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(userRepository.update).toHaveBeenCalledWith(1, updateUserDto);

      expect(result).toEqual(updatedUser);
    });

    it('should throw NotFoundException if user does not exist', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);
      await expect(userService.update(1, updateUserDto)).rejects.toThrow(
        NotFoundException,
      );
      expect(userRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(userRepository.update).not.toHaveBeenCalled();
    });
  });

  // remove a user
  describe('remove', () => {
    it('should soft delete a user by id', async () => {
      jest
        .spyOn(userRepository, 'softDelete')
        .mockResolvedValue({ affected: 1 } as any);
      await userService.remove(1);
      expect(userRepository.softDelete).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if user cannot be deleted', async () => {
      jest
        .spyOn(userRepository, 'softDelete')
        .mockResolvedValue({ affected: 0 } as any);
      await expect(userService.remove(100)).rejects.toThrow(NotFoundException);
    });
  });
});
