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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
let Item = class Item {
};
__decorate([
    typeorm_1.ObjectIdColumn(),
    __metadata("design:type", String)
], Item.prototype, "_id", void 0);
__decorate([
    typeorm_1.Column(),
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], Item.prototype, "name", void 0);
__decorate([
    typeorm_1.Column(),
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], Item.prototype, "description", void 0);
__decorate([
    typeorm_1.Column(),
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], Item.prototype, "quantity", void 0);
Item = __decorate([
    typeorm_1.Entity()
], Item);
exports.Item = Item;
class ItemInput {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.MinLength(4, {
        message: 'name item must be at least 4 characters'
    }),
    class_validator_1.IsNotEmpty({ message: 'item name can not be blank.' }),
    __metadata("design:type", String)
], ItemInput.prototype, "name", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'description can not be blank.' }),
    __metadata("design:type", String)
], ItemInput.prototype, "description", void 0);
__decorate([
    class_validator_1.IsNumber(),
    class_validator_1.IsNotEmpty({ message: 'quantity can not be blank.' }),
    __metadata("design:type", Number)
], ItemInput.prototype, "quantity", void 0);
exports.ItemInput = ItemInput;
class ItemUpdate {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.MinLength(4, {
        message: 'name item must be at least 4 characters'
    }),
    __metadata("design:type", String)
], ItemUpdate.prototype, "name", void 0);
exports.ItemUpdate = ItemUpdate;
//# sourceMappingURL=item.entity.js.map