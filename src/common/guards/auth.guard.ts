import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus, Logger } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { GqlExecutionContext } from '@nestjs/graphql';
import { userInfo } from 'os';

@Injectable()
export class AuthGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = GqlExecutionContext.create(context);
        const req  = ctx.getContext().req;
        if (!req.headers.authorization) {
            return false;
        }
        req.user = await this.validateToken(req.headers.authorization);
        Logger.log(req.user);
        return true;
    }
    async validateToken(auth: string) {
        if (auth.split(' ')[0] !== 'Bearer') {
            throw new HttpException('Invalid token', HttpStatus.FORBIDDEN);
        }
        const token = auth.split(' ')[1];

        try {
            const decode = jwt.decode(token, 'huunghia.nguyen');
            if (!decode) {
                throw new HttpException('token not exists!', HttpStatus.FORBIDDEN);
            }
            // check is expired token
            if (Date.now() >= decode.exp * 1000) {
                throw new HttpException('Token is expired!', HttpStatus.FORBIDDEN);
            }
            return decode;
        } catch (err) {
            const message = ' Token error : ' + (err.message || err.name );
            throw new HttpException(message, HttpStatus.FORBIDDEN);
        }
    }

}
