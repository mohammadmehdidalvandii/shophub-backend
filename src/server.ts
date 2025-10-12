import express from "express";
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

const app = express();

dotenv.config();

// Middleware 
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());

app.get('/',(req , res)=>{
        res.send('Hello world')
})

const PORT = process.env.PORT || 3000;

app.listen(PORT , ()=>{
    console.log(`Server running on PORT ${PORT}`)
});