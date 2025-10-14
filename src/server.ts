import express from "express";
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { connectToDB } from "./config/db";
import AuthRouter from './routes/authRoutes';
import UserRouter from './routes/userRoutes';

const app = express();

dotenv.config();

// Middleware 
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());

// Connect to DB
connectToDB()

// Routers
app.use('/api/auth', AuthRouter);
app.use('/api/users', UserRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT , ()=>{
    console.log(`Server running on PORT ${PORT}`)
});