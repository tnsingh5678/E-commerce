import express, { urlencoded } from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import cors from "cors"
import userRoutes from './routes/user.routes.js'
import itemRoutes from './routes/item.routes.js'
import cartRoutes from './routes/cart.routes.js'
import dbConnection from "./DB/dbConnection.js";
import authRoutes from "./routes/auth.routes.js"
import productRoutes from './routes/product.routes.js'
import mailRoutes from './routes/mail.routes.js'
dotenv.config();

const app = express();
dbConnection();
app.use(cors({
    origin : [process.env.FRONTEND_URL],
    methods: ['GET','POST','PUT','DELETE'],
    credentials : true
}))

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json())


const PORT = process.env.PORT || 4000;
app.use(express.json())
app.use('/user',userRoutes)
app.use('/cart',cartRoutes)
app.use('/item',itemRoutes)
app.use('/auth',authRoutes)
app.use('/product',productRoutes)
app.use('/mail',mailRoutes)

app.get('/test', (req, res) => {
    res.status(200).json({ message: "Server is working!" });
});


app.listen(PORT,()=>{
    console.log("Your service running at port : ",PORT)
})