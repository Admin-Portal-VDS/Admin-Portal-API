import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PasswordService } from 'src/password/password.service';
import { BaseService } from 'src/common/base/services/base.service';
import { SearchService } from 'src/search/search/search.service';

@Injectable()
export class UsersService extends BaseService<UserEntity, string | number> {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly passwordService: PasswordService,
    private readonly searchService: SearchService,
  ) {
    super(userRepository);
  }

  async create(createUserDto): Promise<UserEntity> {
    const { password, ...rest } = createUserDto;
    const hashedPassword = await this.passwordService.hashPassword(password);
    const user = await super.create({ ...rest, password: hashedPassword });
    await this.searchService.indexUser(user);
    return user;
  }

  async findAll(): Promise<UserEntity[]> {
    return super.findAll(['role', 'groups']);
  }

  async findOne(
    key: keyof UserEntity,
    id: string | number,
    options?: Options,
  ): Promise<UserEntity> {
    const newOptions = { ...options, relations: ['role', 'groups'] };
    return super.findOne(key, id, newOptions);
  }

  async search(key: string) {
    const results = this.searchService.search(key);
    return results;
  }
}
