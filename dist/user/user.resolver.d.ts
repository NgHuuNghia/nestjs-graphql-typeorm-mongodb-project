import { UserService } from './user.service';
import { User, UserInput } from './user.entity';
import { PubSubEngine } from 'graphql-subscriptions';
export declare class UserResolver {
    private pubSub;
    private userService;
    constructor(pubSub: PubSubEngine, userService: UserService);
    users(): Promise<User[]>;
    user(id: string): Promise<User>;
    signup(input: UserInput): Promise<User>;
    login(input: UserInput): Promise<import("../auth/auth.entity").Auth>;
    signupUser(): AsyncIterator<unknown, any, undefined>;
    loginUser(): AsyncIterator<unknown, any, undefined>;
}
