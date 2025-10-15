import CategoriesModel from "../models/Categories";
import {categoryProps } from "../types/category";

export const categoriesService = {
    async createCategory(data:categoryProps){
        const {title} = data;
        const existing =  await CategoriesModel.findOne({title:title});
        if(existing){
            throw new Error('Categories are available')
        };

        const newCategory = await CategoriesModel.create({title});
        return newCategory
    }
}