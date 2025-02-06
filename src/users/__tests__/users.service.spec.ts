import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { PasswordService } from 'src/password/password.service';
import { Repository } from 'typeorm';
import { createUserDto, user, users } from '../mock/mock-user';
import { SearchService } from 'src/search/search/search.service';

describe('UsersService', () => {
  let userService: UsersService;
  let userRepository: Repository<UserEntity>;
  let passwordService: PasswordService;
  let searchService: SearchService;

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

  const mockSearhService = {
    indexUser: jest.fn(),
    search: jest.fn(),
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
        {
          provide: SearchService,
          useValue: mockSearhService,
        },
      ],
    }).compile();
    userService = module.get(UsersService);
    userRepository = module.get(getRepositoryToken(UserEntity));
    passwordService = module.get(PasswordService);
    searchService = module.get(SearchService);
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
      jest.spyOn(searchService, 'indexUser').mockResolvedValue(undefined);
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

  // get all users
  describe('findAll', () => {
    it('should return all users when users exists', async () => {
      jest.spyOn(userRepository, 'find').mockResolvedValue(users);
      const result = await userService.findAll();
      expect(result).toEqual(users);
    });
  });

  // get user by id
  describe('findOne', () => {
    it('should return a user by id', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);
      const result = await userService.findOne('id', 1);
      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['role', 'groups'],
        withDeleted: false,
      });
      expect(result).toEqual(user);
    });
  });
});
