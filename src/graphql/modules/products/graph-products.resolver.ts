import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  Filter,
  GraphqlFilter,
  GraphqlSorting,
  Paginator,
  PaginatorArgs,
  SelectedFields,
  SelectedFieldsResult,
  SortArgs,
  Sorting,
} from 'nestjs-graphql-tools';

import {
  CreateProductInputType,
  ProductObject,
  UpdateProductInputType,
} from './inputs';
import { ProductsService } from './services';

@Resolver(() => ProductObject)
export class GraphProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Query(() => [ProductObject])
  @GraphqlSorting()
  @GraphqlFilter()
  async products(
    @Filter(() => ProductObject) where: ProductObject,
    @Sorting(() => ProductObject) sorting: SortArgs<ProductObject>,
    @Paginator() pagination: PaginatorArgs,
    @SelectedFields({ sqlAlias: 'p' }) selectedFields: SelectedFieldsResult,
  ) {
    return await this.productsService.find({
      where,
      sorting,
      pagination,
      selectedFields,
    });
  }

  @Mutation(() => ProductObject)
  async createProduct(@Args('input') input: CreateProductInputType) {
    return await this.productsService.create(input);
  }

  @Mutation(() => ProductObject)
  async updateProduct(
    @Args('id') id: string,
    @Args('input') input: UpdateProductInputType,
  ): Promise<ProductObject> {
    return await this.productsService.update(id, input);
  }

  @Mutation(() => Boolean)
  async deleteProduct(@Args('id') id: string): Promise<boolean> {
    return await this.productsService.delete(id);
  }
}
