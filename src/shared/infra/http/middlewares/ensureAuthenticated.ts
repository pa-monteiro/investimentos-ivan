import { AppError } from "@shared/errors/AppError";
import { NextFunction, request, Request, Response } from "express";
import { verify } from 'jsonwebtoken'
import { UsersRepository } from "@modules/account/infra/typeorm/repositories/UsersRepository";
import { UsersTokensRepository } from "@modules/account/infra/typeorm/repositories/UsersTokensRepository";
import auth from "@config/auth";

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(req: Request, res: Response, next: NextFunction){
    const authHeader = req.headers.authorization;
    const usersTokenRepository = new UsersTokensRepository();

    if(!authHeader) throw new AppError('Token missing.')
    const [, token] = authHeader.split(" ")

    try{
       const { sub: user_id } = verify(token, auth.secret_refresh_token) as IPayload;

       const userToken = await usersTokenRepository.findByUserIdAndRefreshToken(user_id, token);
       if(!userToken){
           throw new AppError("User not exists")
       }
       const u = new UsersRepository();
       const user = await u.findById(user_id)

       request.user = {
           id: user_id,
           isAdmin: user.isAdmin
       }

       next();
    }catch {
        throw new AppError('Invalid token!')
    }
}