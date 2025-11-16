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
    },
    async getAll(req:req , res:res){
        try{
            const messages = await messageServices.getAllMessage();
            res.status(200).json({
                message:"Get all messages successfully",
                statusCode:200,
                data:messages
            })
        }catch(error:any){
            return res.status(500).json({
                message:"Server Internal Error getAllMessage",
                statusCode:500,
                error:error.message
            })
        }
    },
    async delete(req:req, res:res){
        try{
            const {id} = req.params;
            if(!id){
                return res.status(400).json({
                    message:"Id is not found",
                    statusCode:400,
                })
            };
            const message = await messageServices.deleteMessage(id);
            res.status(200).json({
                message:'delete message successfully',
                statusCode:200,
                data:message
            })
        }catch(error:any){
            return res.status(500).json({
                message:"Server Internal Error Delete message",
                statusCode:500,
                error:error.message,
            })
        }
    }
}