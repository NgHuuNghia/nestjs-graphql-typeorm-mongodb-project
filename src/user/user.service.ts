import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { User, UserInput } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Auth } from '../auth/auth.entity';
import * as uuid from 'uuid';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepository: MongoRepository<User>) {

    }

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async findOne(id: string): Promise<User> {
        return await this.userRepository.findOne({ _id: id });
    }

    async signup(input: UserInput): Promise<User> {
        const checkUser = await this.userRepository.findOne({ username: input.username });
        if (checkUser) {
            throw new HttpException(
                'username is already!',
                HttpStatus.BAD_REQUEST,
            );
        }
        const user = new User();
        user._id = uuid.v4();
        user.username = input.username;
        user.password = bcrypt.hashSync(input.password, 10);
        return await this.userRepository.save(user);
    }

    async login(input: UserInput): Promise<Auth> { // authentication

        const user = await this.userRepository.findOne({ username: input.username });
        if (!user) {
            throw new HttpException(
                'account does not exist!',
                HttpStatus.BAD_REQUEST,
            );
        }

        const isEqual =  bcrypt.compareSync(input.password, user.password);
        if (!isEqual) {
            throw new HttpException('Password is incorrect', HttpStatus.BAD_REQUEST);
        }
        const token = jwt.sign(
            { userId: user._id, username: user.username },
             'huunghia.nguyen',
            { expiresIn: '1d' },
        );

        return {
            // userId: user._id,
            token,
            // tokenExpiration: 1,
         }; // Auth
    }
}
