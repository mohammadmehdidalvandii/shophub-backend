import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    label:{
        type:String,
        trim:true,
    },
    street:{
        type:String,
        trim: true,
    },
    city:{
        type:String,
        trim:true,
    },
    state:{
        type:String,
        trim:true,
    },
    zipCode:{
        type:String,
        trim:true,
    },
    country:{
        type:String,
        trim:true,
    }
});

const userSchema = new mongoose.Schema({
    firstName:{type:String , required:true , trim:true},
    lastName:{type:String , required:true , trim:true},
    email:{type:String , required:true , trim:true},
    password:{type:String , required:true , trim:true},
    role:{type:String , enum:['ADMIN','CUSTOMER'], default:"CUSTOMER", required:true },
    phone:{type:String ,required:true},
    profileImage:{type:String},
    dateOfBirth:{type:Date},
    addresses:[addressSchema],
    isActive:{type:Boolean , default:true},
    gender:{type:String , enum:['male', 'female' ,'other']}
},{
    timestamps:true
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel