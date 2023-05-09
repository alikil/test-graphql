import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsDecimal, IsNumber, IsOptional } from 'class-validator';

import { UserEntity } from '../../../../database';

@ObjectType({
  description: "Product's object type",
})
export class ProductObject {
  @Field(() => String) name: string;
  @Field(() => Number) price: number;
  @Field(() => [String], { defaultValue: [] }) user: UserEntity[];
  // default
  @Field(() => String) id: string;
  @Field(() => Date) created_at: Date;
  @Field(() => Date) updated_at: Date;
}

@InputType({
  description: "Create product's input type",
})
export class CreateProductInputType implements Partial<ProductObject> {
  @Field() name: string;
  @Field()
  @IsNumber({ maxDecimalPlaces: 2 })
  price: number;
}

@InputType({
  description: "Update product's input type",
})
export class UpdateProductInputType implements Partial<ProductObject> {
  @Field({ nullable: true }) name?: string;
  @Field({ nullable: true }) @IsOptional() @IsDecimal() price?: number;
}

@InputType({
  description: "Add user to product's input type",
})
export class AddUserToProduct {
  @Field() user_id: string;
  @Field() product_id: string;
}
