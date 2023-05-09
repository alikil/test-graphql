import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

import { BaseEntity } from './base.entity';
import { ProductEntity } from './product.entity';

@Entity('user')
export class UserEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 30, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({ type: 'int', nullable: false })
  age: number;

  @ManyToMany(() => ProductEntity, (product) => product.id)
  @JoinTable()
  order: ProductEntity[];
}
