import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ItemModule } from './item/item.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { UserModule } from './user/user.module';
import config from './common/config/keys';
import { MulterModule } from '@nestjs/platform-express';

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
      context: ({ req }) => ({ req }),
      playground: true,
      installSubscriptionHandlers: true,
    }),
    MulterModule.register({
      dest: './files',
    }),
    ItemModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
