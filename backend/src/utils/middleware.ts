import {type Response, type Request, type NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import ENV from './config';
import type { string } from 'zod';

declare global{
    namespace Express{
        interface Request{
            userId: string
        }
    }
}

export const authMiddle = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const authHead = req.headers.authorization
        if(!authHead){
            throw new Error('authHead is missing')
        }
        const token = authHead.split(' ')[1]
        if(!token){
            throw new Error('token is missing')
        }
        const decoded = jwt.verify(token, ENV.JWT_SECRET) as {userId: string}
        req.userId = decoded.userId
    }catch(error: any){
        return res.status(500).json({message: 'seomething went wrong'})
    }

}