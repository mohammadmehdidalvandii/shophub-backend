import { userServices } from "../services/userServices";
import { req, res } from "../types/express";

export const userController = {
    async getUsers (req:req , res:res){
        try{
            const users = await userServices.getAllUsers();
            res.status(200).json({
                message:"get all users successfully",
                statusCode:200,
                data:users,
            })
        }catch(error:any){
            res.status(500).json({
                message:"Server Internal get all  users =>",
                statusCode:500,
                error:error.message
            })
        }
    }
}