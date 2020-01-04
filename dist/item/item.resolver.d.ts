import { ItemService } from './item.service';
import { Item } from './item.entity';
import { ItemInput, ItemUpdate } from './item.entity';
import { PubSubEngine } from 'graphql-subscriptions';
export declare class ItemResolver {
    private pubSub;
    private readonly itemService;
    constructor(pubSub: PubSubEngine, itemService: ItemService);
    items(): Promise<Item[]>;
    item(id: string): Promise<Item>;
    createItem(input: ItemInput): Promise<Item>;
    deleteItem(id: string): Promise<boolean>;
    updateItem(id: string, input: ItemUpdate): Promise<Item>;
    itemCreated(): AsyncIterator<unknown, any, undefined>;
    itemUpdated(): AsyncIterator<unknown, any, undefined>;
}
