import mongoose,{Schema} from "mongoose"

const billSchema = new mongoose.Schema({
    "userId":{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    "price":{
        type: Number,
        required: true
    },
    "item":[{
        type: [Schema.Types.ObjectId],
        ref: 'ITEM',
        required: true
    }]

},{timestamps: true})

const Bill = mongoose.model('ECOMBILL',billSchema);

export default Bill;