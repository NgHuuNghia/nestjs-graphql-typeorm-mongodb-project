import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User, UserInput } from './user.entity';
import { PubSubEngine } from 'graphql-subscriptions';
import { Inject, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../common/guards/auth.guard';

@Resolver('User')
export class UserResolver {

    constructor(@Inject('PUB_SUB') private pubSub: PubSubEngine, private userService: UserService) { }

    @Query(() => [User])
    @UseGuards(new AuthGuard()) // authorization
    async users() {
        return this.userService.findAll();
    }
    @Query(() => User)
    async user(@Args('id') id: string) {
        return this.userService.findOne(id);
    }
    @Mutation(() => User)
    async signup(@Args('input') input: UserInput ) {
        const registerUser = this.userService.signup(input);
        this.pubSub.publish('signupUser', { signupUser: registerUser });
        return registerUser;
    }
    @Mutation(() => User)
    async login(@Args('input') input: UserInput ) {
        const rsloginUser = this.userService.login(input);
        this.pubSub.publish('loginUser', { loginUser: rsloginUser });
        return rsloginUser;
    }
    @Subscription()
    signupUser() {
        return this.pubSub.asyncIterator('signupUser');
    }
    @Subscription()
    loginUser() {
        return this.pubSub.asyncIterator('loginUser');
    }
    // __.publish('XXX', { XXX: ___ });
    // __ asyncIterator('XXX');

}
