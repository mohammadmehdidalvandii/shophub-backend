import { categoriesService } from "../services/categoryServices";
import { req, res } from "../types/express";

export const categoryController = {
    async create(req:req , res:res){
        try{
            const {title} = req.body;
            const newCategory = await categoriesService.createCategory({title});
            return res.status(201).json({
                message:"Created new Category successfully",
                statusCode:201,
                data:newCategory,
            })
        } catch(error:any){
            return res.status(500).json({
                message:"Server Internal category",
                statusCode:500,
                error:error.message,
            })
        }
    }
}