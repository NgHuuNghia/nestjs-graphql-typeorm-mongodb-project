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
const graphql_1 = require("@nestjs/graphql");
const item_service_1 = require("./item.service");
const item_entity_1 = require("./item.entity");
const item_entity_2 = require("./item.entity");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const common_1 = require("@nestjs/common");
let ItemResolver = class ItemResolver {
    constructor(pubSub, itemService) {
        this.pubSub = pubSub;
        this.itemService = itemService;
    }
    async items() {
        return this.itemService.findAll();
    }
    async item(id) {
        return this.itemService.findOne(id);
    }
    async createItem(input) {
        const createdItem = this.itemService.create(input);
        this.pubSub.publish('itemCreated', { itemCreated: createdItem });
        return createdItem;
    }
    async deleteItem(id) {
        return this.itemService.delete(id);
    }
    async updateItem(id, input) {
        const updatedItem = this.itemService.update(id, input);
        this.pubSub.publish('itemUpdated', { itemUpdated: updatedItem });
        return updatedItem;
    }
    itemCreated() {
        return this.pubSub.asyncIterator('itemCreated');
    }
    itemUpdated() {
        return this.pubSub.asyncIterator('itemUpdated');
    }
};
__decorate([
    graphql_1.Query(() => [item_entity_1.Item]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ItemResolver.prototype, "items", null);
__decorate([
    graphql_1.Query(() => item_entity_1.Item),
    __param(0, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ItemResolver.prototype, "item", null);
__decorate([
    graphql_1.Mutation(() => item_entity_1.Item),
    __param(0, graphql_1.Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [item_entity_2.ItemInput]),
    __metadata("design:returntype", Promise)
], ItemResolver.prototype, "createItem", null);
__decorate([
    graphql_1.Mutation(() => item_entity_1.Item),
    __param(0, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ItemResolver.prototype, "deleteItem", null);
__decorate([
    graphql_1.Mutation(() => item_entity_1.Item),
    __param(0, graphql_1.Args('id')), __param(1, graphql_1.Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, item_entity_2.ItemUpdate]),
    __metadata("design:returntype", Promise)
], ItemResolver.prototype, "updateItem", null);
__decorate([
    graphql_1.Subscription(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ItemResolver.prototype, "itemCreated", null);
__decorate([
    graphql_1.Subscription(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ItemResolver.prototype, "itemUpdated", null);
ItemResolver = __decorate([
    graphql_1.Resolver('Item'),
    __param(0, common_1.Inject('PUB_SUB')),
    __metadata("design:paramtypes", [graphql_subscriptions_1.PubSubEngine, item_service_1.ItemService])
], ItemResolver);
exports.ItemResolver = ItemResolver;
//# sourceMappingURL=item.resolver.js.map