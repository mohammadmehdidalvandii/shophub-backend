import mongoose from "mongoose";
import CategoriesModel from  './Categories';

const productSchema = new mongoose.Schema({
    productName:{type:String , required:true , trim:true},
    productSKU:{type:String , required:true , trim:true},
    price:{type:String, required:true},
    compareAtPrice:{type:String},
    costPerItem:{type:String},
    category:{type:mongoose.Types.ObjectId, ref:CategoriesModel, required:true},
    brand:{type:String , required:true},
    description:{type:String, required:true},
    stockQuantity:{type:String , required:true, default:0},
    barcode:{type:String},
    weight:{type:String, required:true },
    dimensions:{
        length:{
            type:String,
            required:true,
            title:'Length (cm)'
        },
        width:{
            type:String,
            required:true,
            title:'Width (cm)'
        },
        height:{
            type:String,
            required:true,
            title:'Height (cm)'
        }
    },
    tags:[{type:String}],
    images:[{type:String}],
    status:{
        type:String,
        enum:["active","draft","archived"],
        default:"active",
    },
    vender:{type:String , required:true}
},{
    timestamps:true
});

const ProductModel = mongoose.model('Product', productSchema);

export default ProductModel