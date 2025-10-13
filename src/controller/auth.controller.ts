import { authService } from "../services/authServices";
import {req , res} from '../types/express'

export const authController = {
    async register(req:req ,  res:res){
        try{
            const data = req.body;
            const newUser = await authService.register(data);

            res.status(201).json({
                message:"Created User successfully",
                statusCode:201,
                data:[newUser]
            })
        } catch(error:any){
            res.status(500).json({
                message:"Server Internal error ",
                error:error.message,
                statusCode:500,
            })
        }
    },
}