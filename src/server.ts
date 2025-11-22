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
import MessageRouter from './routes/messageRoutes';
import path from "path";

const app = express();

dotenv.config();

const uploadsDir = path.join(process.cwd(), "uploads");

// access upload static
app.use('/uploads', express.static(uploadsDir))

// Middleware 
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(morgan('dev'));
app.use(helmet());
app.use(cors({credentials:true, origin:'https://shop-hub.chbk.app'}));

// Connect to DB
connectToDB()

// Routers
app.use('/api/auth', AuthRouter);
app.use('/api/users', UserRouter);
app.use('/api/categories', CategoriesRouter);
app.use('/api/products', ProductRouter);
app.use('/api/orders' , OrderRouter);
app.use('/api/wishlist' ,  WishlistRouter);
app.use('/api/messages', MessageRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT , ()=>{
    console.log(`Server running on PORT ${PORT}`)
});