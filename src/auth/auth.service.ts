import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from 'src/password/password.service';
import { UserEntity } from 'src/users/entities/user.entity';

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
    const user = await this.usersService.findByEmail(email);
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

  async login(user: UserEntity): Promise<{ token: string }> {
    const { email, ...rest } = user;
    const payload = { user: rest, sub: email };
    return {
      token: await this.jwtService.signAsync(payload),
    };
  }
}
