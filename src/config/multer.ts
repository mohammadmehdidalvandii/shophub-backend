import path from "path";
import multer from 'multer';
import { req } from "../types/express";
import fs from "fs";

const uploadsDir = path.join(process.cwd(), "uploads"); 

if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination:function(req , file , cb){
        cb(null , uploadsDir)
    },
    filename: function(req , file , cb){
        const uniqueSuffix  =  Date.now() + '-'+Math.round(Math.random()+1e9);
        cb(null , uniqueSuffix + path.extname(file.originalname));
    }
});

const fileFilter = (req:req , file:any , cb:any)=>{
    const allowedTypes = /jpeg|jpg|png|webp/;
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