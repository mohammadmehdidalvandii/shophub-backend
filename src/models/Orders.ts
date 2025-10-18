import mongoose from "mongoose";
import ProductModel from "./Products";
import UserModel from "./Users";

const orderSchema = new mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:UserModel,
        required:true
    },
    items:[{
        product:{
            type: mongoose.Types.ObjectId,
            ref:ProductModel,
            required:true
        },
        quantity:{
            type:Number,
            required:true,
            default:1
        },
        price:{
            type:Number,
            required:true,
        },
    }],
    customerInfo:{
        firstName:{
            type:String,
            required:true
        },
        lastName:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        phone:{
            type:String,
            required:true
        },
        address:{
            type:String,
            required:true
        },
        city:{
            type:String,
            required:true
        },
        state:{
            type:String,
            required:true
        },
        postalCode:{
            type:String,
            required:true
        },
        country:{
            type:String,
            required:true
        },
        orderNote:{
            type:String,
            required:false
        },
    },
    totalAmount:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:['pending', 'paid','shipped','completed','cancelled'],
        default:'pending'
    },
    paymentMethod:{
        type:String,
        required:true,
    },
},{
    timestamps:true,
});

const OrderModel = mongoose.model('Order', orderSchema);

export default OrderModel