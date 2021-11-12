import { AppError } from "@shared/errors/AppError";
import { NextFunction, request, Request, Response } from "express";
import { verify } from 'jsonwebtoken'
import { UsersRepository } from "@modules/account/infra/typeorm/repositories/UsersRepository";

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(req: Request, res: Response, next: NextFunction){
    const authHeader = req.headers.authorization;
    if(!authHeader) throw new AppError('Token missing.')
    const [, token] = authHeader.split(" ")

    try{
       const { sub: user_id } = verify(token, "998c77fb9d94e2d2edd73e5431b9af88") as IPayload;

       const usersRepository = new UsersRepository();
       const user = await usersRepository.findById(user_id);
       if(!user){
           throw new AppError("User not exists")
       }

       request.user = {
           id: user_id
       }

       next();
    }catch {
        throw new AppError('Invalid token!')
    }
}