import mongoose from "mongoose"

const itemSchema = new mongoose.Schema({
    "itemId":{
        type: String,
        required: true,
        unique: true
    },
    "itemName":{
        type: String,
        required: true

    },
    "quantity":{
        type: Number,
        required: true
    },
    "price" : {
        type: Number,
        required: true
    },
    "Urls" :{
        type: [String],
        required: true
    }

},{timestamps: true})

const Item = mongoose.model('ECOMITEM',itemSchema);

export default Item