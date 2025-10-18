import mongoose from "mongoose";
import OrderModel from "../models/Orders";
import { OrderProps } from "../types/order";
import ProductModel from "../models/Products";

export const orderServices = {
    async createOrder(data:OrderProps , userId:string){
        // const session = await mongoose.startSession();
        // session.startTransaction();
        try{
            let totalAmount = 0;
            for(const item of data.items){
                const product = await ProductModel.findOne({_id:item.product});//.session(session)
                if(!product){
                    throw new Error('Product With ID not found');
                };

                const itemPrice = Number(item.price);
                const itemQty = Number(item.quantity);
                
                if(itemQty > Number(product.stockQuantity)){
                    throw new Error("Insufficient stock for product");
                };
                totalAmount += itemPrice * itemQty;
                 product.stockQuantity  = (Number(product.stockQuantity) - itemQty).toString();
                 await product.save(); //{session}
            };

            const order =  await OrderModel.create([{
                ...data,
                status:data.status,
                user:userId,
                totalAmount:totalAmount,
            }])

            // await session.commitTransaction();
            // session.endSession();

            return order[0];
        }catch(error:any){
            // await session.abortTransaction();
            // session.endSession();
            throw error;
        }
    },
    async getAllOrders(){
        const orders = await OrderModel.find({}).sort({createdAt:-1}).populate('user','-password').populate('items.product').lean();
        return orders
    }
}