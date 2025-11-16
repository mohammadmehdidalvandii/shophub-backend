import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
    },
    email:{
        type:String,
        trim:true,
        required:true,
    },
    subject:{
        type:String,
        trim:true,
        required:true,
    },
    message:{
        type:String,
        trim:true,
        required:true,
    }
},{
    timestamps:true
});

const MessageModel = mongoose.model('Message',messageSchema);

export default MessageModel;