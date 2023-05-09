import { DataSourceOptions } from 'typeorm';
import { ProductEntity, UserEntity } from './sqlite/models';

const config: DataSourceOptions = {
  type: 'sqlite',
  database: ':memory:',
  synchronize: true,
  entities: [UserEntity, ProductEntity],
};
export default config;
