import { Module } from '@nestjs/common';
import { ItemResolver } from './item.resolver';
import { ItemService } from './item.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './item.entity';
import { PubSub } from 'graphql-subscriptions';

@Module({
  imports: [TypeOrmModule.forFeature([Item])],
  providers: [ItemResolver, ItemService, {
    provide: 'PUB_SUB',
    useValue: new PubSub(),
  }],
})
export class ItemModule {}
