import { productServices } from "../services/productServices";
import { req, res } from "../types/express";

export const productController = {
    async create(req:req , res:res){
        try{
            const {productName, productSKU , price , compareAtPrice , costPerItem, category ,brand ,description , stockQuantity ,barcode ,weight ,dimensions , length ,width , height ,tags , status , vender} = req.body;
            
            let images:string[] = [];
            if(Array.isArray(req.files)){
                images = req.files.map((file:Express.Multer.File)=>`/uploads/${file.filename}`);
            } else if(req.file){
                images = [`/uploads/${req.file.filename}`];
            }else{
                images = []
            }

            const productDate = {
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
                    height
                },
                tags: tags?.split(','),
                status,
                images,
                vender}
            const product = await productServices.createProduct(productDate)

            res.status(201).json({
                message:'created product successfully',
                statusCode:201,
                data:product
            })
        }catch(error:any){
            return res.status(500).json({
                message:'Server Internal Error product create',
                statusCode:500,
                error:error.message,
            })
        }
    }
}