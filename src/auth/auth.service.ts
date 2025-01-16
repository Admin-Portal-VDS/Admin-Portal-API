import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(id: number, inputPassword: string): Promise<{ token: string }> {
    const user = await this.usersService.findOne(id);
    if (user?.password != inputPassword) {
      throw new UnauthorizedException();
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;
    const payload = { user: userWithoutPassword };

    return {
      token: await this.jwtService.signAsync(payload),
    };
  }
}
