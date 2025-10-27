import WishListModel from "../models/Wishlist";

export const wishlistServices = {
    async addToWishlist(userID:string , productId:string){
        console.log("userid=>", userID);
        console.log("product", productId);
        const wishlist = await WishListModel.findOne({user:userID});
        if(!wishlist){
            const newWishlist = await WishListModel.create({
                user:userID,
                items:[{product:productId}],
            });

            return newWishlist;
        }
    }
}