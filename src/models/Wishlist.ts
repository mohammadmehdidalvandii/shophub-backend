import mongoose from "mongoose";
import UserModel from "./Users";
import ProductModel from "./Products";

const wishlistSchema = new mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:UserModel,
        required:true,
        unique:true,
    },
    items:[{
        product:{
            type:mongoose.Types.ObjectId,
            ref:ProductModel,
            required:true,
        },
        addAt:{
            type:Date,
            default:Date.now,
        }
    }]
},{
    timestamps:true,
});

const WishListModel = mongoose.model('Wishlist', wishlistSchema);
export default WishListModel;