import express from "express"
import Item from "../models/item.models.js"
import multer from "multer"
import cloudinary from "cloudinary"
import uploadToCloudinary from "../controllers/cloudinary.controller.js"


const router = express.Router();

const storage = multer.memoryStorage({
    filename: function (req,file,cb){
        cb(null,file.originalname)
    }
});
const upload = multer({storage: storage})

router.post('/additem', upload.single('file') , async (req,res)=>{

    const { itemName, quantity, price, itemId } = req.body;

    if(!itemName||!quantity||!price||!itemId){
        return res.status(404).json({
            message: "All fields required"
        })

    }

    try{
        if (!req.file) {
            return res.status(400).json({
                message: 'No file uploaded'
            });
        }
        //console.log(req.file)
        let fileUrls = [];
        const fileBuffer =req.file.buffer;
        if (!fileBuffer) {
           // console.log("NO buffer received")
            return res.status(400).json({
              message: "No valid file buffer received"
            });
        }
        //console.log("hello")
        const url = await uploadToCloudinary(fileBuffer);
        //console.log("ho gya")
        fileUrls.push(url);

        if(fileUrls.length===0){
            return res.status(401).json({
                message: "Image not uploaded"
            })
        }

        const newItem = new Item({
            itemId : itemId,
            itemName: itemName,
            quantity: quantity,
            price: price,
            Urls: fileUrls 
        });

        await newItem.save();

        return res.status(200).json({
            message: "Item added successfully",
            item: newItem
        });

    }
    catch(error){
        return res.status(500).json({
            message: "Error while adding item",
            error: error.message      
        });
    }

})

router.put('/updateitem', async (req,res)=>{
    const { itemId , itemName, quantity,price} = req.body;
    if(!itemId||!itemName||!quantity||!price){
        return res.status(404).json({
            message:"All fields are required for updating item"
        })
    } 

    const item = await Item.findById(itemId);
    item.itemId = itemId;
    item.itemName = itemName;
    item.quantity = quantity;
    item.price = price;

    await item.save();

    return res.status(200).json({
        message: "item updated successfully"
    })
})

router.put('/update/img', upload.array('file',1) , async (req,res)=>{
    const { itemId , index} = req.body;
    
    try {
        if(!itemId||!index){
            return res.status(401).json({
                message: "Item not found for updating image"
            })
        }
        const item = await Item.findById(itemId);
        const file = req.files[0];
        const url = await uploadToCloudinary(file.buffer);
        item.Urls[index] = url;
        await item.save();

        return res.status(200).json({
            message: "Image updated successfully",
            item
        })

        
    } catch (error) {
        return res.status(500).json({
            message: "Error while updating image",
            error: error.message
        })
    }
})

router.delete('/deleteitem', async (req,res) =>{
    try {
        const {itemId} = req.body;
        if(!itemId){
            return res.status(404).json({
                message: "Item is invalid"
            })
        }
        await Item.findByIdAndDelete(itemId);
    
        return res.status(200).json({
            message: "Item deleted successfully"
        })
    } catch (error) {
        return res.status(400).json({
            message: "error while deleting item"
        })
    }
})

export default router;