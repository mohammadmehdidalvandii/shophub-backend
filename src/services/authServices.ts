import UserModel from "../models/Users";
import { RegisterProps } from "../types/auth";
import {generateAccessToken , generateRefreshToken , hashedPassword , comparePassword} from '../utils/auth'

export const authService = {
 async register(data:RegisterProps){
    const {firstName,lastName,email,password,role,phone} = data;
    // existing user 
    const existing = await UserModel.findOne({email:email});
    if(existing) throw new Error("User exist already");

    // check Role User

    // hash-password
    const hashPassword = await hashedPassword(password);
    // Access-token
    const user =  await UserModel.create({
        firstName,
        lastName,
        email,
        password:hashPassword,
        role,
        phone,
    });

    return user
 },
}