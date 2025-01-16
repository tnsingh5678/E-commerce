import { UserProvider } from "../context/UserContext";
import { CartProvider } from "../context/CartContext";
import CartComponent from "../components/Cart";


export default function Cart(){
    return(
        <>
        <UserProvider>
            <CartProvider>
                <CartComponent/>
            </CartProvider>
        </UserProvider>
        </>
    )
}