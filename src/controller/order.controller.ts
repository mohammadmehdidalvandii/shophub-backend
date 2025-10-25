import { orderServices } from "../services/OrderServices";
import { req, res } from "../types/express";

export const orderController = {
    async create(req:req , res:res){
        try{
            const userID = req.user?._id;
            if(!userID){
                return res.status(401).json({
                    message:"Unauthorized",
                    statusCode:401,
                });
            };
            const {product ,quantity , price ,firstName ,lastName , email ,phone ,address , city ,state , postalCode ,country ,totalAmount,paymentMethod ,status} = req.body;
            const orderData = {
                user:userID,
                items:[{
                    product,
                    quantity,
                    price,
                }],
                customerInfo:{
                    firstName,
                    lastName,   
                    email,
                    phone,
                    address,
                    city,
                    state,
                    postalCode,
                    country,
                },
                totalAmount,
                paymentMethod,
                status
            }
            const order = await orderServices.createOrder(orderData , userID);
            res.status(201).json({
                message:"Order created Successfully",
                statusCode:201,
                data:order,
            })

        }catch(error:any){
            res.status(500).json({
                message:"Server Internal Error creating order",
                statusCode:500,
                error:error.message,
            })
        }
    },
    async getOrders(req:req, res:res){
        try{
            const orders = await orderServices.getAllOrders();
            res.status(200).json({
                message:"get all orders successfully",
                statusCode:200,
                data:orders
            })
        }catch(error:any){
            res.status(500).json({
                message:"Server Internal get All Orders",
                statusCode:500,
                error:error.message
            })
        }
    },
    async getOrderId(req:req , res:res){
        try{
            const {id} =  req.params;
            if(!id){
                res.status(400).json({
                    message:"ID is not found",
                    statusCode:400,
                });
            };
            const order = await orderServices.getOrderById(id);
            res.status(200).json({
                message:"Get Order by id successfully",
                statusCode:200,
                data:order,
            })
        }catch(error:any){
            res.status(500).json({
                message:"Server Internal get order by id",
                statusCode:500,
                error:error.message,
            })
        }
    },
    async getOrderByUserId(req:req , res:res){
        try{
            const {id} = req.params;
            if(!id){
                res.status(400).json({
                    message:"ID is not found",
                    statusCode:400,
                });
            };

          
            const orders = await orderServices.getOrderByUser(id);
            res.status(200).json({
                message:"get all user orders",
                statusCode:200,
                data:orders
            })


        }catch(error:any){
            res.status(500).json({
                message:"Server Internal get order by user id",
                statusCode:500,
                error:error.message,
            })
        }
    }
}