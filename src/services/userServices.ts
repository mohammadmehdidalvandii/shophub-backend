import UserModel from '../models/Users';

export const userServices = {
    async getAllUsers (){
        const users = await UserModel.find().sort({createdAt:-1}).select('-password');
        return users
    }
}