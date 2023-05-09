import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  PaginatorArgs,
  SelectedFieldsResult,
  SortArgs,
} from 'nestjs-graphql-tools';
import { Repository } from 'typeorm';

import { ProductEntity } from '../../../../database';
import {
  CreateProductInputType,
  ProductObject,
  UpdateProductInputType,
} from '../inputs';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  public async find(params: {
    where: ProductObject;
    sorting?: SortArgs<ProductObject>;
    pagination: PaginatorArgs;
    selectedFields: SelectedFieldsResult;
  }): Promise<ProductEntity[]> {
    const qb = this.productRepository.createQueryBuilder('p');

    // joins
    const selectedFieldsArr =
      params?.selectedFields?.fieldsData?.fieldsString || [];
    if (selectedFieldsArr.length > 0 && selectedFieldsArr.includes('p.users')) {
      qb.leftJoin('user_order_product', 'uop', 'uop."productId" = p.id');
      qb.leftJoin('user_order', 'uo', 'uop."orderId" = uo.id');
    }

    // params
    if (params) {
      if (params.selectedFields) {
        qb.select(
          params.selectedFields.fieldsData.fieldsString.filter(
            (field) => field !== 'p.user',
          ),
        );
      }
      if (params.where) qb.where(params.where);
      if (params.pagination)
        qb.skip((params.pagination.page - 1) * params.pagination.per_page).take(
          params.pagination.per_page,
        );
      if (params.sorting) qb.orderBy(params.sorting);
    }

    return qb.getMany();
  }

  public async create(product: CreateProductInputType): Promise<ProductEntity> {
    return await this.productRepository.save(product);
  }

  public async update(
    id: string,
    product: UpdateProductInputType,
  ): Promise<ProductObject> {
    const productData = await this.productRepository.findOneBy({ id });
    if (product.name) productData.name = product.name;
    if (product.price) productData.price = product.price;
    return await this.productRepository.save(productData);
  }

  public async delete(id: string): Promise<boolean> {
    return !!(await this.productRepository.delete({ id })).affected;
  }
}
