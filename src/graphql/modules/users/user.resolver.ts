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
import { Brackets } from 'typeorm';

import { getFieldsFromContext } from '../../utils';
import { CreateUserInputType, UpdateUserInputType, UserObject } from './inputs';
import { UsersService } from './services';

@Resolver(() => UserObject)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [UserObject])
  @GraphqlSorting()
  @GraphqlFilter()
  async users(
    @Filter(() => UserObject, {
      sqlAlias: 'u',
    })
    where: Brackets,
    @Sorting(() => UserObject) sorting: SortArgs<UserObject>,
    @Paginator() pagination: PaginatorArgs,
    @SelectedFields({ sqlAlias: 'u' }) selectedFields: SelectedFieldsResult,
  ) {
    const fields = getFieldsFromContext('users', selectedFields);
    return await this.usersService.find({
      where,
      sorting,
      pagination,
      selectedFields,
      fields,
    });
  }

  @Mutation(() => UserObject)
  async createUser(@Args('input') input: CreateUserInputType) {
    return await this.usersService.create(input);
  }

  @Mutation(() => UserObject)
  async updateUser(
    @Args('id') id: string,
    @Args('input') input: UpdateUserInputType,
  ): Promise<UserObject> {
    return await this.usersService.update(id, input);
  }

  @Mutation(() => Boolean)
  async deleteUser(@Args('id') id: string): Promise<boolean> {
    return await this.usersService.delete(id);
  }

  @Mutation(() => Boolean)
  async addProductToUser(
    @Args('userId') userId: string,
    @Args('productId') productId: string,
  ): Promise<boolean> {
    return await this.usersService.addProductToUser(userId, productId);
  }

  @Mutation(() => Boolean)
  async removeProductFromUser(
    @Args('userId') userId: string,
    @Args('productId') productId: string,
  ): Promise<boolean> {
    return await this.usersService.removeProductFromUser(userId, productId);
  }
}
