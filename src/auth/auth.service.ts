import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, inputPassword: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && user.password === inputPassword) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    return null;
  }

  async login(user: any): Promise<{ token: string }> {
    const { email, ...rest } = user;
    const payload = { user: rest, sub: email };
    return {
      token: await this.jwtService.signAsync(payload),
    };
  }
}
