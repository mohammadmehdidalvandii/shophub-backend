import {body , validationResult} from 'express-validator';
import {req , res , next} from '../types/express';

const validationCreateProduct = [
  body("productName").notEmpty().withMessage("Product Name is required"),
  body("price").notEmpty().withMessage("Price is required"),
  body("category").notEmpty().withMessage("Category is required").isMongoId().withMessage("Category must be a valid Mongo ID"),
  body("brand").notEmpty().withMessage("Brand is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("stockQuantity").notEmpty().withMessage("Stock quantity is required"),
  body("weight").notEmpty().withMessage("Weight is required"),
  body("length").notEmpty().withMessage("Length is required"),
  body("width").notEmpty().withMessage("Width is required"),
  body("height").notEmpty().withMessage("Height is required"),
  body("tags").notEmpty().withMessage("Tags is required"),
  body("status").isIn(["active", "draft", "archived"]).withMessage("Status must be one of: active, draft, archived."),
  body("vender").notEmpty().withMessage("Vender is required"),
    (req:req , res:res , next:next)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({error:errors.array()})
        };
        next()
    }
];

export {
    validationCreateProduct
}