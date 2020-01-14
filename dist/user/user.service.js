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
const user_entity_1 = require("./user.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const uuid = require("uuid");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async findAll() {
        return await this.userRepository.find();
    }
    async findOne(id) {
        return await this.userRepository.findOne({ _id: id });
    }
    async signup(input) {
        const checkUser = await this.userRepository.findOne({ username: input.username });
        if (checkUser) {
            throw new common_1.HttpException('username is already!', common_1.HttpStatus.BAD_REQUEST);
        }
        const user = new user_entity_1.User();
        user._id = uuid.v4();
        user.username = input.username;
        user.password = bcrypt.hashSync(input.password, 10);
        return await this.userRepository.save(user);
    }
    async login(input) {
        const user = await this.userRepository.findOne({ username: input.username });
        if (!user) {
            throw new common_1.HttpException('account does not exist!', common_1.HttpStatus.BAD_REQUEST);
        }
        const isEqual = bcrypt.compareSync(input.password, user.password);
        if (!isEqual) {
            throw new common_1.HttpException('Password is incorrect', common_1.HttpStatus.BAD_REQUEST);
        }
        const token = jwt.sign({ userId: user._id, username: user.username }, 'huunghia.nguyen', { expiresIn: '1d' });
        return {
            token,
        };
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.MongoRepository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map