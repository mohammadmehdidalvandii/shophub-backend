import { productServices } from "../services/productServices";
import { req, res } from "../types/express";

export const productController = {
    async create(req:req , res:res){
        try{
            const {productName, productSKU , price , compareAtPrice , costPerItem, category ,brand ,description , stockQuantity ,barcode ,weight ,dimensions , length ,width , height ,tags , status , vender} = req.body;

            let images:string[] = [];
            if(Array.isArray(req.files)){
                images = req.files.map((file:Express.Multer.File)=>`http://localhost:3000/uploads/${file.filename}`);
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
    },
    async getAll(req:req , res:res){
        try{
            const products = await productServices.getAllProducts();
            res.status(200).json({
                message:"get all products Successfully",
                statusCode:200,
                data:products,
            });
        }catch(error:any){
            return res.status(500).json({
                message:"Server Internal error get all products",
                statusCode:500,
                error:error.message
            })
        }
    },
    async getProductID(req:req , res:res){
        try{
        const {id} = req.params;
        if(!id){
            return res.status(400).json({
                message:"ID is not found",
                statusCode:400,
            })
        }
        const product = await productServices.getProductById(id);
        return res.status(200).json({
            message:"get all Product by ID",
            statusCode:200,
            data:product
        })
        } catch(error:any){
            return res.status(500).json({
                message:"Server Internal error get product by id",
                statusCode:500,
                error:error.message,
            })
        }
    }
}