import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseModule, UserEntity } from '../../../database';
import { UsersService } from './services';
import { UsersResolver } from './user.resolver';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([UserEntity])],
  providers: [UsersResolver, UsersService],
})
export class GraphUsersModule {}
