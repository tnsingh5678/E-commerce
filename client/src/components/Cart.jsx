import axios from "axios"
import { useContext } from "react"
import { toast } from "react-toastify"
import { CartContext } from "../context/CartContext"
import { UserContext } from "../context/UserContext"

export default function CartComponent(){

    const {user} = useContext(UserContext);
    const {cart} = useContext(CartContext);
    console.log(cart)
    const orderHandler = async ()=>{
        try {
            const order = await axios.post('http://localhost:4000/cart/bill',{
                cart,
                userId: user.userId
            })
            if( !order ){
                toast.error("No item is purchased")
            }
            toast.success("Order successful")
        } catch (error) {
            toast.error("Error while purchasing the item")
        }
        
    }
    // want to show cart items
    return(
        <>
        <div className="bg-gray-500 w-auto h-500px p-4">
                <h2 className="text-white">Your Cart</h2>
                
                {/* Render the cart items */}
                <div className="cart-items">
                    {cart.length > 0 ? (
                        cart.map((item, index) => (
                            <div key={index} className="cart-item grid grid-cols-3">
                                <div>
                                    <img src={item.Urls[0]} className="w-[400px] h-[400px]"></img>
                                    <p>{item.itemName} - ${item.price}</p>
                                </div>
                                
                            </div>
                        ))
                    ) : (
                        <p className="text-white">Your cart is empty.</p>
                    )}
                </div>

                <button
                    onClick={orderHandler}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Order Now
                </button>
        </div>
        </>
    )


}