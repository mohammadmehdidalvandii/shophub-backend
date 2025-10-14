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
    },
    async userById(req:req , res:res){
        try{
            const {id} = req.params;
            if(!id){
                res.status(400).json({
                    message:"ID not found",
                    statusCode:400
                })
            } else{
                const user = await userServices.getUserById(id);
                res.status(200).json({
                    message:"get user by ID successfully",
                    statusCode:200,
                    data:user,
                })
            }
        }catch(error:any){
            res.status(500).json({
                message:"Server Internal get user by id",
                statusCode:500,
                error:error.message,
            })
        }
    }
}