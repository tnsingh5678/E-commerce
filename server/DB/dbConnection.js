import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

export default async function dbConnection (){ 
    await mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log("Mongo DB is connected successfully")
    }).catch((error)=>{
        console.log("Error while connecting to database " ,error);
    })
}