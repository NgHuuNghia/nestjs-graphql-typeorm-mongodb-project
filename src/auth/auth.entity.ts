import { IsString, IsNumber } from 'class-validator';

export class Auth {
    // @IsString()
    // userId: string;
    @IsString()
    token: string;
    // @IsNumber()
    // tokenExpiration: number;
}
