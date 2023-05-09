import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseModule, ProductEntity } from '../../../database';
import { GraphProductsResolver } from './graph-products.resolver';
import { ProductsService } from './services';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([ProductEntity])],
  providers: [GraphProductsResolver, ProductsService],
  exports: [],
})
export class GraphProductsModule {}
