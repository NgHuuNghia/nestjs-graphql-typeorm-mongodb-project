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
let User = class User {
};
__decorate([
    typeorm_1.ObjectIdColumn(),
    __metadata("design:type", String)
], User.prototype, "_id", void 0);
__decorate([
    typeorm_1.Column({ unique: true }),
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    typeorm_1.Column(),
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
User = __decorate([
    typeorm_1.Entity()
], User);
exports.User = User;
class UserInput {
}
__decorate([
    class_validator_1.MinLength(4, {
        message: 'username must be at least 4 characters',
    }),
    typeorm_1.Column(),
    class_validator_1.IsString({ message: 'username is not string' }),
    class_validator_1.IsNotEmpty({ message: 'username can not be blank.' }),
    __metadata("design:type", String)
], UserInput.prototype, "username", void 0);
__decorate([
    typeorm_1.Column(),
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty({ message: 'password can not be blank.' }),
    __metadata("design:type", String)
], UserInput.prototype, "password", void 0);
exports.UserInput = UserInput;
//# sourceMappingURL=user.entity.js.map