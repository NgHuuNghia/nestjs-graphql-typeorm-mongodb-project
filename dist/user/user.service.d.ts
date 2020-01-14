import { User, UserInput } from './user.entity';
import { MongoRepository } from 'typeorm';
import { Auth } from '../auth/auth.entity';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: MongoRepository<User>);
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    signup(input: UserInput): Promise<User>;
    login(input: UserInput): Promise<Auth>;
}
