import { Injectable } from '@nestjs/common';
import { ItemInput, ItemUpdate } from './item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './item.entity';
import { MongoRepository } from 'typeorm';
import * as uuid from 'uuid';

@Injectable()
export class ItemService {
    constructor(@InjectRepository(Item) private readonly itemRepository: MongoRepository<Item> ) {

    }

    async findAll(): Promise<Item[]> {
        return await this.itemRepository.find();
    }

    async findOne(id: string): Promise<Item> {
        return await this.itemRepository.findOne({_id: id});
    }

    async create(input: ItemInput): Promise<Item> {
        const item = new Item();
        item._id = uuid.v4();
        item.name = input.name;
        item.description = input.description;
        item.quantity = input.quantity;
        return await this.itemRepository.save(item);
    }

    async delete(id: string): Promise<boolean> {
        const item = new Item();
        item._id = id;
        return (await this.itemRepository.remove(item)) ? true : false;
    }

    async update(id: string, itemUpdate: ItemUpdate): Promise<Item> {
        const { name, description, quantity } = itemUpdate;
        const item = await this.itemRepository.findOne({ _id: id});
        item.name = name !== undefined ? name : item.name;
        item.description = description !== undefined ? description : item.description;
        item.quantity = quantity !== undefined ? quantity : item.quantity;
        return await this.itemRepository.save(item);
    }
}
