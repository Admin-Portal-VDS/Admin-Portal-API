import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  async create(createUserDto): Promise<UserEntity[]> {
    const { password, email, ...rest } = createUserDto;

    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }
    const hashedPassword = await this.passwordService.hashPassword(password);
    const newUser = this.userRepository.create({
      ...rest,
      email,
      password: hashedPassword,
    });
    return await this.userRepository.save(newUser);
  }
  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find({ relations: ['role', 'groups'] });
  }
  async findById(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['role', 'groups'],
    });
    if (!user) {
      throw new NotFoundException(`No user found with id ${id}`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['role', 'groups'],
    });
    if (!user) {
      throw new NotFoundException(`No user found with email ${email}`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    await this.userRepository.update(id, updateUserDto);
    const updatedUser = await this.userRepository.findOne({ where: { id } });
    return updatedUser;
  }
  async remove(id: number): Promise<void> {
    const result = await this.userRepository.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundException(
        `User with id ${id} cannot be deleted because it does not exists`,
      );
    }
  }
}
