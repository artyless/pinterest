import {Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const JWT_SECRET: string | undefined = process.env.JWT_SECRET

export function auth(req: Request, res: Response, next: NextFunction): Response | void {
    if (req.method === 'OPTION') {
        // Правильно?
        // return next()
        // Или так
        return next()
        // next()
    }

    try {
        if (!req.headers.authorization) {
            return res.status(500).json({message: 'Problems with query'})
        }

        const token = req.headers.authorization.split(' ')[1] // 'Bearer TOKEN'

        if (!token) {
            return res.status(401).json({message: 'Not authenticated!'})
        }

        if (!JWT_SECRET) {
            return res.status(500).json({message: 'Problems with server'})
        }

        // И что???
        // const decoded:any = jwt.verify(token, JWT_SECRET)
        // А это зачем???
        // req.user = decoded
        // next()
        next()
    } catch (e: any) {
        console.error(e.message)
        return res.status(401).json({message: 'Not authenticated!'})
    }
}
