import express from "express";
import User from "../models/user.models.js";
import Item from "../models/item.models.js";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken"

const router = express.Router();

const hashed = async (password) => {
    const newPassword = await bcrypt.hash(password, 10);
    return newPassword;
}

const validator = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailPattern.test(email);
}

router.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!email || !name || !password) {
            return res.status(404).json({
                message: "All fields are compulsory"
            });
        }

        const isEmail = validator(email);

        if (!isEmail) {
            return res.status(404).json({
                "message": "Email is not valid"
            });
        }

        const hashedPassword = await hashed(password);

        const newUser = new User({
            name: name,
            email: email,
            password: hashedPassword
        });

        await newUser.save();

        return res.status(200).json({
            message: "New User created successfully"
        });
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            message: "Error during creating a new user"
        });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "User is not available. Please create an account first"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }


        const payload = {email: user.email ,userId: user._id, name: user.name ,phone : user.phone}
        const key = process.env.JWT_SECRET_KEY;

        const token = JWT.sign(payload,key,{expiresIn: '1h'})
        console.log(token)
        console.log(user)
        return res.status(200).json({
            message: "User successfully logged in",
            token: token,
        });
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            message: "User login failed. Try after some time"
        });
    }
});

router.get('/user/:userId', async (req,res)=>{
    const {userId} = req.params;
    try {
        if(!userId){
            return res.status(401).json({
                message: "User id is invalid"
            })
        }
        const user = await User.findById(userId);
        if( !user ){
            return  res.status(401).json({
                message: "User not found"
            })
        }

        
        const cart = user.cart;
        const items = await Promise.all(
            cart.map(async (itemId) => {
                try {
                    const item = await Item.findById(itemId);
                    return item; // Return the item to the final array
                } catch (error) {
                    console.log(error);
                    return null; // Return null if there is an error fetching an item
                }
            })
        );

        const validItems = items.filter(item => item !== null);

        res.status(200).json({
            message: "User cart details fetched successfully",
            cart: validItems
        })
    } catch (error) {
        res.status(500).json({
            message: "Error while getting cart"
        })
    }
})



export default router;
