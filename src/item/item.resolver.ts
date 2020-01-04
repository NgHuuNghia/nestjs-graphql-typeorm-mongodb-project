import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { ItemService } from './item.service';
import { Item } from './item.entity';
import { ItemInput, ItemUpdate } from './item.entity';
import { PubSubEngine } from 'graphql-subscriptions';
import { Inject } from '@nestjs/common';

@Resolver('Item')
export class ItemResolver {

    constructor(@Inject('PUB_SUB') private pubSub: PubSubEngine, private readonly itemService: ItemService) {}

    @Query(() => [Item])
    async items() {
        return this.itemService.findAll();
    }
    @Query(() => Item)
    async item(@Args('id') id: string) {
        return this.itemService.findOne(id);
    }
    @Mutation(() => Item)
    async createItem(@Args('input') input: ItemInput ) {
        const createdItem = this.itemService.create(input);
        this.pubSub.publish('itemCreated', { itemCreated: createdItem });
        return createdItem;
    }
    @Mutation(() => Item)
    async deleteItem(@Args('id') id: string) {
        return this.itemService.delete(id);
    }
    @Mutation(() => Item)
    async updateItem(@Args('id') id: string, @Args('input') input: ItemUpdate) {
        const updatedItem = this.itemService.update(id, input);
        this.pubSub.publish('itemUpdated', { itemUpdated: updatedItem });
        return updatedItem;
    }
    @Subscription()
    itemCreated() {
        return this.pubSub.asyncIterator('itemCreated');
    }
    @Subscription()
    itemUpdated() {
        return this.pubSub.asyncIterator('itemUpdated');
    }

}
