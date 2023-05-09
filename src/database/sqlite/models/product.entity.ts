import { Column, Entity, ManyToMany } from 'typeorm';

import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';

@Entity('product')
export class ProductEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @ManyToMany(() => UserEntity, (user) => user.order)
  user: UserEntity[];
}
