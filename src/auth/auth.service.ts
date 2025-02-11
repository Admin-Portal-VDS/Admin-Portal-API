import { Body, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from 'src/password/password.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { RolesService } from 'src/roles/roles.service';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private readonly passwordService: PasswordService,
    private readonly rolesService: RolesService,
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
    const SUPERUSER = await this.rolesService.findOne('id', 1);
    const user = {
      email,
      password,
      role: SUPERUSER,
      first_name: 'Anonymous',
      last_name: 'User',
      login_name: 'anonymous_user',
    };
    await this.usersService.create(user);
    return {
      success: true,
    };
  }

  async login(user: LoginDto): Promise<{ token: string }> {
    const { email, ...rest } = user;
    const payload = { user: rest, sub: email };
    return {
      token: await this.jwtService.signAsync(payload),
    };
  }
}
