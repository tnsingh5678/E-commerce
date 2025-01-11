import { useContext, useState } from "react"
import { UserContext } from "../context/UserContext";
import axios from "axios"
import { toast } from "react-toastify";
import Payment from "./Payment";

export default function Purchase(){
    
    const [ items , setItems ] = useState([]);

    const { user } = useContext(UserContext);
    const userId = user.userId;

    const PurchaseHandler = async (e)=>{
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:4000/cart/bill',{
                userId,
                items
            })
            console.log(res);
            toast.success("Product purchased successfully")
        } catch (error) {
            console.log("error while purchasing the item: ",error.message);
            toast.error("Error while purchasing item");
        }

    }

    return (
        <>
        <p>{user.userId}</p>
        <p>{user.email}</p>
        <Payment/>

        <button onClick={PurchaseHandler} className="bg-gray-500 border border-r-8">
            Order
        </button>
        </>
    )
    

    
}