import { messageServices } from "../services/messageServices";
import { req, res } from "../types/express";

export const messageController = {
    async create(req:req , res:res){
        try{
                    const {name , email , subject , message} = req.body;
        if(!name || !email || !subject || !message){
            return res.status(400).json({
                message:"All filed are required",
                statusCode:400,
            })
        };

        const newMessage = await messageServices.createMessage({name , email ,subject , message})
        
        res.status(201).json({
            message:'Created new message successfully',
            statusCode:201,
            data:newMessage
        })
        }catch(error:any){
            return res.status(500).json({
                message:"Server Internal Error create message",
                statusCode:500,
                error:error.message,
            })
        }
    }
}