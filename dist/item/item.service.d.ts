import { Item, ItemInput, ItemUpdate } from './item.entity';
import { MongoRepository } from 'typeorm';
export declare class ItemService {
    private readonly itemRepository;
    constructor(itemRepository: MongoRepository<Item>);
    findAll(): Promise<Item[]>;
    findOne(id: string): Promise<Item>;
    create(input: ItemInput): Promise<Item>;
    delete(id: string): Promise<boolean>;
    update(id: string, itemUpdate: ItemUpdate): Promise<Item>;
}
