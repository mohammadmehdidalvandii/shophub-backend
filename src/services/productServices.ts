import ProductModel from "../models/Products";
import { ProductProps } from "../types/product";

export const productServices = {
    async createProduct(data:ProductProps){
        const {
            productName,
            productSKU,
            price,
            compareAtPrice,
            costPerItem,
            category,
            brand,
            description,
            stockQuantity,
            barcode,
            weight,
            dimensions:{
                length,
                width,
                height,
            },
            tags,
            images,
            status,
            vender,
        } = data;
        
        const SKU = `WH-${Date.now()}`

       const newProduct = await ProductModel.create({
        productName,
        productSKU:SKU,
        price,
        compareAtPrice,
        costPerItem,
        category,
        brand,
        description,
        stockQuantity,
        barcode,
        weight,
        dimensions:{
            length,
            width,
            height
        },
        tags,
        images,
        status,
        vender,
       }) ;

       return newProduct
    },
    async getAllProducts(){
        const products = await ProductModel.find({}).sort({createdAt:-1}).populate("category","title").lean();
        return products
    }
}