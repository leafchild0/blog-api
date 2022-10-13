import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { usersProviders } from './users.provider';
import { DbModule } from '../db/db.module';

@Module({
  imports: [DbModule],
  controllers: [UsersController],
  exports: [UsersService],
  providers: [...usersProviders, UsersService],
})
export class UsersModule {}
