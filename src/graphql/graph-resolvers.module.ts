import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database';
import { GraphProductsModule, GraphUsersModule } from './modules';

@Module({
  imports: [DatabaseModule, GraphUsersModule, GraphProductsModule],
  controllers: [],
  providers: [],
})
export class GraphResolversModule {}
