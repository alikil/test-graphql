import { Field, InputType, ObjectType, PartialType } from '@nestjs/graphql';
import { IsEmail, IsOptional } from 'class-validator';

import { ProductEntity, UserEntity } from '../../../../database';
import { ProductObject } from '../../products/inputs';

@ObjectType({
  description: "User's object type",
})
export class UserObject implements UserEntity {
  @Field(() => String) name: string;
  @Field(() => String) email: string;
  @Field(() => String) password: string;
  @Field(() => String) age: number;
  @Field(() => [ProductObject], { defaultValue: [] }) order: ProductEntity[];
  // default
  @Field(() => String) id: string;
  @Field(() => Date) created_at: Date;
  @Field(() => Date) updated_at: Date;
}

@InputType()
export class SearchUserInputType {
  @Field(() => String, { nullable: true }) name?: string;
  @Field(() => String, { nullable: true }) email?: string;
}

@InputType({
  description: "Create user's input type",
})
export class CreateUserInputType
  extends PartialType(UserObject)
  implements Partial<UserObject>
{
  @Field() name: string;
  @Field() @IsEmail() email: string;
  @Field() password: string;
  @Field() age: number;
}

@InputType({
  description: "Update user's input type",
})
export class UpdateUserInputType
  extends PartialType(UserObject)
  implements Partial<UserObject>
{
  @Field({ nullable: true }) name?: string;
  @Field({ nullable: true }) @IsOptional() @IsEmail() email?: string;
  @Field({ nullable: true }) password?: string;
  @Field({ nullable: true }) age?: number;
}

@InputType({
  description: "Add product to user's input type",
})
export class AddProductToUser {
  @Field() user_id: string;
  @Field() product_id: string;
}
