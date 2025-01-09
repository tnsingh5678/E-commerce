import express from "express"
import Item from "../models/item.models.js";

const router = express.Router();

router.get('/', async (req,res)=>{
    try {
        const items = await Item.find();
        if(!items){
            return res.status(400).json({
                message: "No item found in stock"
            })
        }

        return res.status(200).json({
            message: "Items fetched successfully",
            items
        })
    } catch (error) {
        return res.status(500).json({
            message: "Error while fetching the items",
            error: error.message
        })
        
    }
})

router.get('/filter/category', async (req,res)=>{
    const categories = req.query.categories;

    if (!categories || !Array.isArray(categories)) {
        return res.status(401).json({
            message: "Category not found"
        });
    }
    try {
        const items = await Item.find({ category: { $in: categories } });

        if (items.length === 0) {
            return res.status(400).json({
                message: "No items found for the selected categories"
            });
        }
        
        return res.status(200).json({
            message: "Item fetched by categories successfully",
            items
        })
    } catch (error) {
        return res.status(500).json({
            message: "Error while fetching the items by category",
            error: error.message
        })
    }

})

router.get('/filter/price', async ( req,res)=>{
    const price = Number(req.query.price);
    console.log(price);
    

    try {
        if(price===0){
            return res.status(401).json({
                message: "Price not found for price filtering"
            })
        }
        console.log(price);
        const items = await Item.find({ price: { $lte: price } });
        console.log(price);

        if (items.length === 0) {
            return res.status(400).json({
                message: "No items found for the selected price range"
            });
        }
        console.log(price);
        console.log(items)

        return res.status(200).json({
            message: "Item filtered by amount successfully",
            items
        })
        

    } catch (error) {
        return res.status(500).json({
            message: "Error while filtering by amount",
            error: error.message
        })
        
    }
})

router.get('/filter/sort', async (req,res)=>{
    const type = req.query.type;
    console.log(type)
    try {
        const items = await Item.find();
        if(items.length === 0){
            return res.status(401).json({
                message: "Item not found for sorting"
            })
        }
        
        if(type==="DEC"){
            items.sort((a, b) => b.price - a.price);
        }else{
            items.sort((a, b) => a.price - b.price);
        }
        
        return res.status(200).json({
            message: "Item sorted successfully",
            items
        })
    } catch (error) {
        return res.status(500).json({
            message: "Error while sorting the items",
            error: error.message
        })
    }
})

export default router;