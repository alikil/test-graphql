import { Module } from '@nestjs/common';

import { GraphqlModule, GraphResolversModule } from './graphql';

@Module({
  imports: [GraphqlModule, GraphResolversModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
