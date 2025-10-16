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
    },
    async update(req:req , res:res){
        try{
        const {id} = req.params;
        if(!id){
            return res.status(400).json({
                message:"ID is not found",
                statusCode:400,
            })
        }
        const updateData:Record<string, any>= {};
        if(req.files){
            if(Array.isArray(req.files) && req.files.length > 0){
                updateData.images = req.files.map((file:Express.Multer.File)=>`http://localhost:3000/uploads/${file.filename}`);
            }else if(req.file){
                updateData.images = [`http://localhost:3000/uploads/${req.file.filename}`];
            }
        };
        
        
        const allowedFields = ['productName','price','category','stockQuantity','images'];
        for(const key of allowedFields){
            if(req.body[key] !== undefined){
                updateData[key] = req.body[key];
            }
        }
        const product = await productServices.updateProduct(id , updateData);
        res.status(200).json({
            message:"product updated successfully",
            statusCode:200,
            data:product,
        })

        }catch(error:any){
            res.status(500).json({
                message:'Server Internal update product',
                statusCode:500,
                error:error.message
            })
        }
    },
    async delete(req:req , res:res){
        try{
        const {id} = req.params;
        if(!id){
            return res.status(400).json({
                message:"ID is not found",
                statusCode:400,
            })
        };
        const deleteProduct = await productServices.deleteProduct(id);
        res.status(200).json({
            message:"delete product successfully",
            statusCode:200,
            data:deleteProduct,
        });
        }catch(error:any){
             res.status(500).json({
                message:'Server Internal delete product',
                statusCode:500,
                error:error.message
            })           
        }
    }
}