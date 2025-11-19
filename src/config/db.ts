import mongoose from 'mongoose';

const database  = process.env.URL || 'mongodb://root:b5aZk7tLYhg0eXkb@services.irn13.chabokan.net:35746/?authSource=admin'
const connectToDB = async ()=>{
    try{
        if(mongoose.connections[0].readyState){
            console.log("Using database connection");
            return true
        }
        const connection = await mongoose.connect(database);
        if(connection){
            console.log("Connected to DB successfully ✅");
            return true
        }
    } catch(error){
        console.log("Database connection error =>",error)
        process.exit(1)
    }
}

export  {connectToDB}