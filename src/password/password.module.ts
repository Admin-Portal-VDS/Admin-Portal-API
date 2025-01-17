import { Global, Module } from '@nestjs/common';
import { PasswordService } from './password.service';

@Module({
  providers: [PasswordService],
  exports: [PasswordService],
})
@Global()
export class PasswordModule {}
