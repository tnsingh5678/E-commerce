import axios from "axios"
import { useContext } from "react"
import { toast } from "react-toastify"
import { CartContext } from "../context/CartContext"
import { UserContext } from "../context/UserContext"

export default function Cart(){

    const user = useContext(UserContext);
    const cart = useContext(CartContext);
    const orderHandler = async ()=>{
        try {
            const order = await axios.post('http://localhost:4000/cart/bill',{
                cart,
                userd: user.userId
            })
            if( !order ){
                toast.error("No item is purchased")
            }
            toast.success("Order successful")
        } catch (error) {
            toast.error("Error while purchasing the item")
        }
        
    }
    // want to show cat items
    return(
        <>
        <div className="bg-gray-500 w-auto h-500px">
            <button onClick={orderHandler}>Order now</button>
        

        </div>
        </>
    )


}