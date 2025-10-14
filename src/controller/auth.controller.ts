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
    async login(req:req , res:res){
        try{
            const {email , password} = req.body;
            const {accessToken , refreshToken} = await authService.login({email , password});

            res.cookie('refreshToken',refreshToken,{
                httpOnly:true,
                sameSite:'none',
                secure:true,
                path:"/",
                maxAge: 7 * 24 *  60 * 60 * 1000 ,
            });

            res.status(200).json({
                message:"Login Successfully",
                statusCode:200,
                data:{accessToken}
            })
            

            } catch(error:any){
            res.status(500).json({
                message:"Sever Internal error",
                error:error.message,
                statusCode:500
            })
        }
    },
    async refreshToken(req:req , res:res){
        try{
            const token  = req.cookies.refreshToken;
            if(!token){
                return res.status(400).json({
                    message:"not found refreshToken",
                    statusCode:400
                })
            };
            const accessToken = await authService.refreshToken(token);
            res.status(200).json({
                message:"Updated Refresh token successfully",
                statusCode:200,
                data:accessToken
            })
        }catch(error:any){
            res.status(500).json({
                message:"Server Internal error RefreshToken",
                statusCode:500,
                error:error.message
            })
        }
    },
    async profile(req:req , res:res){
        try{
            const user = req.user;
            const profile = await authService.getProfile(user._id) ;
            res.status(200).json({
                message:"Get profile Successfully",
                statusCode:200,
                data:profile,
            })
        }catch(error:any){
            res.status(500).json({
                message:"Failed get profile",
                statusCode:500,
                error:error.message
            })
        }
    },
    async logout(req:req , res:res){
        // need addressWeb
        res.clearCookie('refreshToken');
        res.json({message:"Logged out  successfully"})
    }
}