import mongoose, { Schema } from "mongoose"
import Bill from "./bill.models.js";

const userSchema = new mongoose.Schema({
    "name":{
        type: String,
        required : true,
    },
    "email":{
        type: String,
        required : true,
    },
    "password":{
        type: String,
        required : true,
        
    },
    "cart":{
        type:Schema.Types.ObjectId,
        ref: 'ITEM',
        required: false
    },
    "bill":{
        type: Schema.Types.ObjectId,
        ref: 'BILL',
        required: false
    }
},{timestamps: true})

const User = mongoose.model('ECOMUSER',userSchema);

export default User;