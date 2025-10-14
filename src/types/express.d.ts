import { Request , Response , NextFunction } from "express";
export interface req extends Request{
    user?:string | JwtPayload,
}
export type res = Response;
export type next = NextFunction;