import WishListModel from "../models/Wishlist";

export const wishlistServices = {
    async addToWishlist(userID:string , productId:string){
        const wishlist = await WishListModel.findOne({user:userID});
        if(!wishlist){
            const newWishlist = await WishListModel.create({
                user:userID,
                items:[{product:productId}],
            });
            
            return newWishlist;
        }else{
            const exists =  wishlist.items.some((item)=>{
                item.product.toString() === productId
            })
            if(!exists){
                wishlist.items.push({product:productId});
                await wishlist.save();
            };
            return wishlist
        }
    },
    async getWishlistByUser(userID:string){
        const wishlistsUser = await WishListModel.findOne({user:userID}).sort({createdAt:-1}).populate({
  path: "items.product",
  populate: { path: "category", model: "Categories" },
}).populate('user').lean();
        return wishlistsUser
    },
    async removeWishlist(id:string){
        const wishlist = await WishListModel.findOneAndUpdate({_id:id});
        return wishlist
    }
}