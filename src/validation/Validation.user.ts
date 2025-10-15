import {body , validationResult} from 'express-validator';
import { next, req, res } from '../types/express';

const validationRegister = [
    body('firstName').isLength({min:3}).withMessage('The FirstName must be 3 characters or more').notEmpty().withMessage('Felid is required'),
    body('lastName').isLength({min:3}).withMessage('The LastName must be 3 characters or more').notEmpty().withMessage('Felid is required'),
    body('email').isEmail().withMessage('Email is not valid').notEmpty().withMessage('Email is not valid'),
    body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({min:8}).withMessage('Password must be at least 8 characters long')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
    .matches(/[a-z]/).withMessage('password must contain at least one lowercase letter')
    .matches(/[\d]/).withMessage('Password must contain at least one number')
    .matches(/[@$!%*#/"]/).withMessage('Password must contain at least one special characters'), 
    body('phone').notEmpty().withMessage('Phone is required'),
    (req:req , res:res ,next:next)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({error:errors.array()})
        }
        next();
    }
];

const validationLogin = [
    body('email').isEmail().withMessage('Email is not valid').notEmpty().withMessage('Email is not valid'),
    body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({min:8}).withMessage('Password must be at least 8 characters long')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
    .matches(/[a-z]/).withMessage('password must contain at least one lowercase letter')
    .matches(/[\d]/).withMessage('Password must contain at least one number')
    .matches(/[@$!%*#/"]/).withMessage('Password must contain at least one special characters'),
    (req:req ,res:res , next:next) =>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({error:errors.array()})
        }
        next()
    }
]


export {
    validationRegister,
    validationLogin
}