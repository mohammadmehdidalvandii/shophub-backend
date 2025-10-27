import { wishlistServices } from "../services/wishlistServices";
import { req, res } from "../types/express";



export const wishlistController = {
    async create(req:req , res:res){
        try{
            const { product} = req.body;
            const {id} = req.params;
            if(!id){
                res.status(400).json({
                    message:"id is required",
                    statusCode:400,
                });
            };

            const newWishlist = await wishlistServices.addToWishlist(id , product);
            res.status(201).json({
                message:"Created wishlist ",
                statusCode:201,
                data:newWishlist,
            })
        }catch(error:any){
            res.status(500).json({
                message:"add to wishlist server internal ",
                statusCode:500,
                error:error.message
            })
        }
    }
}