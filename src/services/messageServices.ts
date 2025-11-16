import MessageModel from "../models/Message";
import { MessageProps } from "../types/message";

export const messageServices = {
    async createMessage(data:MessageProps){
        const {name , email , subject , message} = data;
        if(!name || !email || !subject || !message){
            throw new Error('All filed are required');
        };

        const newMessage = await MessageModel.create({name , email , subject ,message});

        return newMessage
    },
    async getAllMessage(){
        const messages = await MessageModel.find({}).sort({createdAt:-1}).lean();
        if(!messages || messages.length === 0){
            throw new Error('No messages found')
        }
        return messages
    },
    async deleteMessage(id:string){
        const message = await MessageModel.findOneAndDelete({_id:id});
        return message
    }
}