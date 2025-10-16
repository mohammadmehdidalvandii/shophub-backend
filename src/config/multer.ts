import path from "path";
import multer from 'multer';
import { req } from "../types/express";


const storage = multer.diskStorage({
    destination:function(req , file , cb){
        cb(null , path.join(__dirname, '../uploads'))
    },
    filename: function(req , file , cb){
        const uniqueSuffix  =  Date.now() + '-'+Math.round(Math.random()+1e9);
        cb(null , uniqueSuffix + path.extname(file.originalname));
    }
});

const fileFilter = (req:req , file:any , cb:any)=>{
    const allowedTypes = /jpeg|jpg|png/;
    const isMimeTypesValid = allowedTypes.test(file.mimetype);
    const isExValid = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    if(isMimeTypesValid && isExValid){
        cb(null , true)
    } else{
        cb(new Error('File is *jpeg - jpg -png*'))
    }
};

const limits = {
    fileSize :5 * 1024 * 1024,
};

const upload = multer({storage , fileFilter , limits});

export default upload