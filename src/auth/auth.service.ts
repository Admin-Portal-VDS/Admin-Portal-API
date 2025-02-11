import { Body, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from 'src/password/password.service';
import { UserEntity } from 'src/users/entities/user.entity';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private readonly passwordService: PasswordService,
  ) {}

  async validateUser(
    email: string,
    inputPassword: string,
  ): Promise<UserWithoutPassword | null> {
    const user = await this.usersService.findOne('email', email);
    if (
      user &&
      this.passwordService.comparePassword(inputPassword, user.password)
    ) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    return null;
  }

  async signup(@Body() inputUser: SignupDto) {
    const { email, password, confirmPassword } = inputUser;
    this.passwordService.plainPasswordMatch(password, confirmPassword);
    const user = {
      email,
      password,
      role: 1,
    };
    await this.usersService.create(user);
    const savedUser = await this.usersService.findOne('email', email);
    await this.usersService.update('email', email, { parent_id: savedUser.id });
    return {
      success: true,
    };
  }

  async login(user: UserEntity): Promise<{ token: string }> {
    const { email, ...rest } = user;
    const payload = { user: rest, sub: email };
    return {
      token: await this.jwtService.signAsync(payload),
    };
  }
}
