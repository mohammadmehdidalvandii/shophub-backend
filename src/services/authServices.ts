import UserModel from "../models/Users";
import { LoginProps, RegisterProps } from "../types/auth";
import {generateAccessToken , generateRefreshToken , hashedPassword , comparePassword, verifyToken} from '../utils/auth'

export const authService = {
 async register(data:RegisterProps){
    const {firstName,lastName,email,password,role,phone} = data;
    // validation
    if(!firstName || !lastName || !email || !password || !password || !phone){
        throw new Error("Missing required Fields")
    }
    // existing user 
    const existing = await UserModel.findOne({email:email});
    if(existing) throw new Error("User exist already");

    // check Role User
    const users = await UserModel.find({});
    const useRole = users.length > 0 ? "CUSTOMER":"ADMIN";
    // hash-password
    const hashPassword = await hashedPassword(password);
    const user =  await UserModel.create({
        firstName,
        lastName,
        email,
        password:hashPassword,
        role:useRole,
        phone,
    });

    return user
 },
 async login(data:LoginProps){
    const {email , password} = data;
    if(!email || !password){
        throw new Error('Email and Password are required');
    }
    // find user 
    const user = await UserModel.findOne({email});
    if(!user) throw new Error('User is not found');

    // compare password
    const isPasswordValid = await comparePassword(password , user.password);
    if(!isPasswordValid) throw new Error("Password or Email Not valid");

    const accessToken = generateAccessToken({
        _id:user._id,
        firstName:user.firstName,
        lastName:user.lastName,
        role:user.role,
        phone:user.phone,
    });
    const refreshToken = generateRefreshToken({
        _id:user.id,
    });

    return {accessToken , refreshToken}
 },
 async refreshToken(refreshToken:string){
    try{
        const payload:any = verifyToken(refreshToken);
        const newAccessToken = generateAccessToken({_id:payload._id});

        return newAccessToken
    }catch(error:any){
        throw new Error(`Invalid RefreshToken => ${error}`)
    }
 },
 async getProfile(id:string){
    const profile = await UserModel.findOne({_id:id}).select('-password');
    return profile
 },
 async changePassword(userID:string , oldPassword:string, newPassword:string){
    if(!oldPassword || !newPassword){
        throw new Error('Old and New password are required');
    };
    const user = await UserModel.findOne({_id:userID})
    if(!user){
        throw new Error('User not found')
    }
    const isMatch = await comparePassword(oldPassword , user?.password);
    if(!isMatch){
        throw new Error('Old password is incorrect');
    }

    const hashed = await hashedPassword(newPassword);

    user.password = hashed;
    await  user.save()

    return {success:true}
 }
}