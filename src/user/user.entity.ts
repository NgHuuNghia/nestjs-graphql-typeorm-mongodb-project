import { Entity, Column, ObjectIdColumn } from 'typeorm';
import { IsString, MinLength, IsNotEmpty } from 'class-validator';
import { Stream } from 'stream';

@Entity()
export class User {
    @ObjectIdColumn()
    // tslint:disable-next-line: variable-name
    _id: string;
    @Column({unique: true})
    @IsString()
    @IsNotEmpty()
    username: string;
    @Column()
    @IsString()
    @IsNotEmpty()
    password: string;
}

// tslint:disable-next-line: max-classes-per-file
export class UserInput {
    @MinLength(4, {
        message: 'username must be at least 4 characters',
    })
    @Column()
    @IsString({ message: 'username is not string' })
    @IsNotEmpty({ message: 'username can not be blank.' })
    username: string;
    @Column()
    @IsString()
    @IsNotEmpty({ message: 'password can not be blank.' })
    password: string;
}
