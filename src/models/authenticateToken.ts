import { JwtPayload } from "jsonwebtoken";
import { next, req, res } from "../types/express";
import { verifyToken } from "../utils/auth";

export function authenticateToken (req:req , res:res , next:next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];

     if (!token) {
          return res.status(401).json({ message: "Access denied. No token provided." });
     }
     try{
         const decoded =  verifyToken(token);
         (req as any).user =   decoded?.data
         console.log("decode", decoded?.data)
         next()
     }catch(error){
        return res.status(403).json({
            message:"Invalid or expired token",
            statusCode:403
        })
     }
}