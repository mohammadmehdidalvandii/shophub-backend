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
        }
    },
    async getWishlistByUser(userID:string){
        console.log("user =>",userID)
        const wishlistsUser = await WishListModel.findOne({user:userID}).sort({createdAt:-1}).populate('items.product').populate('user').lean();
        return wishlistsUser
    }
}