import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseModule, ProductEntity } from '../../../database';
import { GraphProductsResolver } from './graph-products.resolver';
import { ProductsService } from './services';

describe('GraphProductsResolver', () => {
  let resolver: GraphProductsResolver;
  let productService: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, TypeOrmModule.forFeature([ProductEntity])],
      providers: [GraphProductsResolver, ProductsService],
    }).compile();

    resolver = module.get<GraphProductsResolver>(GraphProductsResolver);
    productService = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => expect(resolver).toBeDefined());
  it('should be defined', () => expect(productService).toBeDefined());

  describe('createProduct', () => {
    it('should create product', async () => {
      const result = await resolver.createProduct({
        name: faker.vehicle.model(),
        price: 22.44,
      });
      return expect(result.price).toEqual(22.44);
    });
  });
});
