import UserModel from '../models/Users';
import {req , res , next} from '../types/express';

export const authorizeAdmin = async  (req:req , res:res , next:next)=>{
    if(!req.user){
        return res.status(401).json({
            message:'Unauthorized',
            statusCode:401,
        })
    }
    const userid = req.user._id;
    if(!userid){
        return res.status(400).json({
            message:"User ID not found",
            statusCode:400,
        });
    };
    const user = await  UserModel.findOne({_id:userid}).select('-password')
    if(user?.role !== 'ADMIN'){
        res.status(403).json({
            message:"Forbidden . Admins only"
        })
    };
    next()
}