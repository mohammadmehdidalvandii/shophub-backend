import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    }
});

const CategoriesModel = mongoose.model('Categories', categorySchema);

export default CategoriesModel;