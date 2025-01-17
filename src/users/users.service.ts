import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PasswordService } from 'src/password/password.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly passwordService: PasswordService,
  ) {}

  async create(createUserDto): Promise<any> {
    const { password, ...rest } = createUserDto;
    const hashedPassword = await this.passwordService.hashPassword(password);
    const newUser = this.userRepository.create({
      ...rest,
      password: hashedPassword,
    });
    return await this.userRepository.save(newUser);
  }
  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find({ relations: ['role', 'groups'] });
  }
  async findById(id: number): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: { id },
      relations: ['role', 'groups'],
    });
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: { email },
      relations: ['role', 'groups'],
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    await this.userRepository.update(id, updateUserDto);
    const updatedUser = await this.userRepository.findOne({ where: { id } });
    return updatedUser;
  }
  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
