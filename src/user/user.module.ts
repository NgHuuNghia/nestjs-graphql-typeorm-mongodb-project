import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { PubSub } from 'graphql-subscriptions';
@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UserResolver, UserService, {
        provide: 'PUB_SUB',
        useValue: new PubSub(),
    }],
})
export class UserModule {}
