import UserModel from '../models/Users';

    export const userServices = {
        async getAllUsers (){
            const users = await UserModel.find().sort({createdAt:-1}).select('-password');
            return users
        },
        async getUserById(id:string){
            const user = await UserModel.findOne({_id:id}).select('-password');
            return user;
        },  
        async updateUser(id:string ,data:Partial<{firstName:string , lastName:string,email:string,role:string,phone:string}>){
            const userId = await UserModel.findOne({_id:id});
            if(!userId) throw new Error('User not found')
            const user = await UserModel.findOneAndUpdate({_id:id},data,{new:true}).select('-password');
            return user
        },
        async deleteUser(id:string){
            const deleteUser = await UserModel.findOneAndDelete({_id:id});
            return deleteUser
        }
    }