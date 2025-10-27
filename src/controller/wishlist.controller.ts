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
    },
    async getByUser(req:req, res:res){
        try{
            const {id} = req.params;
            if(!id){
                res.status(400).json({
                    message:"id is required",
                    statusCode:400,
                });
            };
            
            const wishlist = await wishlistServices.getWishlistByUser(id);
            res.status(200).json({
                message:"get wishlist by UserId",
                statusCode:200,
                data:wishlist,
            })

        }catch(error:any){
            res.status(500).json({
                message:"Server Internal get by user id",
                statusCode:500,
                error:error.message,
            })
        }
    },
    async remove(req:req , res:res){
        try{
            const {id} = req.params;
            if(!id){
                res.status(400).json({
                    message:"id is required",
                    statusCode:400,
                });
            }; 
            const rmWishlist = await wishlistServices.removeWishlist(id);
            res.status(200).json({
                message:"Removed wishlist",
                statusCode:200,
                data:rmWishlist,
            })
        }catch(error:any){
            res.status(500).json({
                message:"Server Internal removed by id",
                statusCode:500,
                error:error.message,
            })
        }
    }
}