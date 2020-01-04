import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ItemModule } from './item/item.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import config from './config/keys';

@Module({
  imports: [
  TypeOrmModule.forRoot({
    type: 'mongodb',
    url: config.mongoURI,
    entities: [join(__dirname, '**/**.entity{.ts,.js}')],
    synchronize: true,
    useNewUrlParser: true,
    logging: true,
    useUnifiedTopology: true,
  }),
  GraphQLModule.forRoot({
    typePaths: ['./**/*.graphql'],
    playground: true,
    installSubscriptionHandlers: true,
  }),
  ItemModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
