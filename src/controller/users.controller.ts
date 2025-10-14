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
    },
    async update(req:req , res:res){
        try{
            const {id} = req.params; 
             if(!id){
                return res.status(400).json({
                    message:"User Not Found",
                    statusCode:400,
                })
             }else{
                const allowedFields = ['firstName','lastName','email','role','phone','isActive'];
                const updateData:Record<string , any> = {};
                for(const key  of allowedFields){
                    console.log("key =>" , key)
                    if(req.body[key] !== undefined){
                        updateData[key] = req.body[key]
                    }
                }
                console.log("updateData",updateData)
                const user = await userServices.updateUser(id , updateData);
                console.log("user=<", user)
                res.status(200).json({
                    message:"User updated successfully ✅",
                    statusCode:200,
                    data:user,
                })
             }
        }catch(error:any){
            res.status(500).json({
                message:"Server Internal update User ",
                statusCode:500,
                error:error.message,
            })
        }
    }
}