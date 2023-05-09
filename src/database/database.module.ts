import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import ormconfig from './orm.config';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig)],
  providers: [],
  exports: [],
})
export class DatabaseModule {}
