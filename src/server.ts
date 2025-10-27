import express from "express";
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { connectToDB } from "./config/db";
import AuthRouter from './routes/authRoutes';
import UserRouter from './routes/userRoutes';
import CategoriesRouter from './routes/categoryRoutes';
import ProductRouter from './routes/productRoutes'
import OrderRouter from './routes/orderRoutes';
import WishlistRouter from './routes/wishlistRoutes';
import path from "path";

const app = express();

dotenv.config();
console.log("di", path.dirname)

// access upload static
app.use('/uploads', express.static(path.join(__dirname ,'../src/uploads')))

// Middleware 
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(morgan('dev'));
app.use(helmet());
app.use(cors({credentials:true, origin:'http://localhost:3001'}));

// Connect to DB
connectToDB()

// Routers
app.use('/api/auth', AuthRouter);
app.use('/api/users', UserRouter);
app.use('/api/categories', CategoriesRouter);
app.use('/api/products', ProductRouter);
app.use('/api/orders' , OrderRouter);
app.use('/api/wishlist' ,  WishlistRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT , ()=>{
    console.log(`Server running on PORT ${PORT}`)
});