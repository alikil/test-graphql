import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  PaginatorArgs,
  SelectedFieldsResult,
  SortArgs,
} from 'nestjs-graphql-tools';
import { Brackets, Repository } from 'typeorm';

import { UserEntity } from '../../../../database';
import { CreateUserInputType, UserObject } from '../inputs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  public async find(params: {
    where: Brackets;
    sorting: SortArgs<UserObject>;
    pagination: PaginatorArgs;
    selectedFields: SelectedFieldsResult;
    fields: string[];
  }): Promise<UserEntity[]> {
    const qb = this.userRepository.createQueryBuilder('u');
    const select = params.selectedFields.fieldsData.fieldsString;

    // relations
    if (params.fields.includes('order')) {
      qb.leftJoinAndSelect('u.order', 'order');
      select.push('order');
    }

    // params
    if (params) {
      if (params.selectedFields) qb.select(select);
      if (params.where) qb.where(params.where);
      if (params.pagination)
        qb.skip((params.pagination.page - 1) * params.pagination.per_page).take(
          params.pagination.per_page,
        );
      if (params.sorting) qb.orderBy(params.sorting);
    }

    return qb.getMany();
  }

  public async create(user: CreateUserInputType): Promise<UserEntity> {
    return await this.userRepository.save(user);
  }

  public async update(
    id: string,
    user: Partial<UserEntity>,
  ): Promise<UserEntity> {
    const userData = await this.userRepository.findOneBy({ id });
    if (!userData) throw new Error('User not found');
    if (user.name) userData.name = user.name;
    if (user.email) userData.email = user.email;
    if (user.password) userData.password = user.password;
    if (user.age) userData.age = user.age;
    await this.userRepository.update({ id }, userData);
    return userData;
  }

  public async delete(id: string): Promise<boolean> {
    return !!(await this.userRepository.delete({ id })).affected;
  }

  public async addProductToUser(
    userId: string,
    productId: string,
  ): Promise<boolean> {
    await this.userRepository
      .createQueryBuilder()
      .relation('order')
      .of(userId)
      .add(productId);
    return true;
  }

  public async removeProductFromUser(
    userId: string,
    productId: string,
  ): Promise<boolean> {
    await this.userRepository
      .createQueryBuilder()
      .relation('order')
      .of(userId)
      .remove(productId);
    return true;
  }
}
