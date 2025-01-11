import mongoose, { Schema } from "mongoose"
import Bill from "./bill.models.js";
import Item from "./item.models.js";

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
    "phone":{
        type: String,
        unique: true,
        required: true

    },
    "cart":[{
        
        type:Schema.Types.ObjectId,
        ref: 'ECOMITEM',
        required: false
    }],
    "bill":[{
        type: Schema.Types.ObjectId,
        ref: 'ECOMBILL',
        required: false
    }]
},{timestamps: true})

const User = mongoose.model('ECOMUSER',userSchema);

export default User;