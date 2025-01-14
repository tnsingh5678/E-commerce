import express from "express"
import User from "../models/user.models.js";
import Item from "../models/item.models.js";
import Bill from "../models/bill.models.js";
import Razorpay from "razorpay"
const router = express.Router();

// const razorpay = new Razorpay({
//     key_id: process.env.RAZORPAY_KEY,
//     key_secret: process.env.RAZORPAY_SECRET_KEY
// })

router.post('/bill',async(req,res)=>{
    try{
        const {cart,userId} = req.body;
        let totalPrice = 0;
        cart.forEach((item)=>{
            totalPrice+=item.quantity*item.price;
        })

        const user = await User.findById(userId);
        let bill = await Bill.findOne({userId : user._id});
        if (!bill) {
            bill = new Bill({
                userId : user._id,
                price : totalPrice,
                item : cart.map(item=> item.itemId)
            })
            await bill.save();
            
        }else{
            bill.price=totalPrice;
            bill.item = cart.map(item=> item.itemId)
            await bill.save();

        }
        
        return res.status(200).json({
            message: "Bill successfully generated",
            bill
        })

    }catch(error){
        return res.status(200).json({
            message: "Error while generating bill"
        })
    }
    
})

// router.post('/payment',async (req,res)=>{
//     const amount = req.body;
//     try {
//         const options = {
//             amount,
//             currency: 'INR',
//             receipt: `receipt#${Math.floor(Math.random() * 1000000)}`,
//             payment_capture: 1
//         }

//         const order = await razorpay.orders.create(options);

//         res.status(200).json({
//             id: order.id,
//             amount: order.amount,
//             currency: order.currency,
//         });
//     } catch (error) {
//         return res.status(500).json({
//             message:"Error during payment with stripe",
//             error: error.message
//         })
//     }
// })

router.post('/additem', async (req,res)=>{
    try {
        const { itemId , quantity , price , userId} = req.body;
        console.log(itemId)
        console.log(quantity)
        console.log(price)
        console.log(userId)
    
        if(!itemId||!quantity||!price){
            return res.status(404).json({
                message : "Some invalid entry in adding item"
            })
        }
    
        const item = await Item.findOne({itemId: itemId});
        if(!item){
            return res.status(200).json({
                message: "Item is not available"
            })
        }
        const user = await User.findById(userId);
        if(!user){
            return res.status(400).json({
                message : "User provided is not valid"
            })
        }
        if(!user.cart) user.cart = [];
        user.cart.push(item)
    
        await user.save();
    
        return res.status(200).json({
            message : "Item added successfully",
            user
        })
    } catch (error) {
        return res.status(400).json({
            message : "Error while adding item",
            error: error.message
        })
    }
})

router.put('/updateItem', async ( req,res) =>{
    try {
        const { itemId , updateQuantity,userId} = req.body;
        if(!itemId || !updateQuantity){
            return res.status(400).json({
                message: "Item id is incorrect or No item chosen"
            })
        }
    
        const user = await User.findById(userId);
        if(!user){
            return res.status(400).json({
                message: "User not found"
            })
        }
        const itemIndex = user.cart.findIndex(item=> item.itemId.toString()===itemId);

        if( itemIndex !==-1 ){
            user.cart[itemIndex].quantity += updateQuantity;

        }else{
            return res.status(400).json({
                message: "Item not found in cart"
            })
        }
    
        await user.save();
        return res.status(200).json({
            message: "Cart Updated successfully"
        })
    
    } catch (error) {
        return res.status(400).json({
            message: "Error while updating item",
            error: error.message
        })
    }
})

router.delete('/deleteitem', async (req,res)=>{
    try {
        const { itemId , userId } = req.body;
        if(!itemId||!userId){
            return res.status(404).json({
                message: "All fields are compulsory"
            })
        }
        const user = await User.findById(userId);
    
        if(!user){
            return res.status(400).json({
                message: "User not available in db"
            })
        }
        const itemIndex = user.cart.findIndex(item=> item.itemId.toString()===itemId);

        if(itemIndex === -1){
            return res.status(400).json({
                message: "Item is not available"
            })
        }
    
        user.cart.splice(itemIndex,1);
        await user.save();
        return res.status(200),json({
            message: "Item deleted successfully"
        })
    } catch (error) {
        return res.status(400).json({
            message: "Error while deleting item",
            error: error.message
        })
    }

})

export default router;