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
    },
    async delete(req:req , res:res){
        try{
            const {id} = req.params;
            if(!id) return res.status(400).json({message:"ID not found",statusCode:400});
            const deleteCategory = await categoriesService.deleteCategory(id);
            return res.status(200).json({
                message:"Delete category successfully",
                statusCode:200,
                data:deleteCategory,
            })
        }catch(error:any){
            return res.status(500).json({
                message:"Server Internal Category",
                statusCode:500,
                error:error.message,
            })
        }
    },
    async getCategories(req:req, res:res){
        try{
            const categories = await categoriesService.getAllCategory();
            return res.status(200).json({
                message:"Get all Categories successfully",
                statusCode:200,
                data:categories,
            })
        }catch(error:any){
            return res.status(500).json({
                message:"Server Internal Category get",
                statusCode:500,
                error:error.message,
            })
        }
    }
}