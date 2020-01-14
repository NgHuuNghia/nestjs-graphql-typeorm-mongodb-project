"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const item_entity_1 = require("./item.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const uuid = require("uuid");
let ItemService = class ItemService {
    constructor(itemRepository) {
        this.itemRepository = itemRepository;
    }
    async findAll() {
        return await this.itemRepository.find();
    }
    async findOne(id) {
        return await this.itemRepository.findOne({ _id: id });
    }
    async create(input) {
        const item = new item_entity_1.Item();
        item._id = uuid.v4();
        item.name = input.name;
        item.description = input.description;
        item.quantity = input.quantity;
        return await this.itemRepository.save(item);
    }
    async delete(id) {
        const item = new item_entity_1.Item();
        item._id = id;
        return (await this.itemRepository.remove(item)) ? true : false;
    }
    async update(id, itemUpdate) {
        const { name, description, quantity } = itemUpdate;
        const item = await this.itemRepository.findOne({ _id: id });
        item.name = name !== undefined ? name : item.name;
        item.description = description !== undefined ? description : item.description;
        item.quantity = quantity !== undefined ? quantity : item.quantity;
        return await this.itemRepository.save(item);
    }
};
ItemService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(item_entity_1.Item)),
    __metadata("design:paramtypes", [typeorm_2.MongoRepository])
], ItemService);
exports.ItemService = ItemService;
//# sourceMappingURL=item.service.js.map