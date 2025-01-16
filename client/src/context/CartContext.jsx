import { createContext , useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

const CartContext = createContext();

const CartProvider = async ({children})=>{
    const [ cart , setCart ] = useState([]);

    const { user } = useContext(UserContext);
    const userId = user.userId;
    const details = await axios.get('http://localhost:4000/auth/user',{
        params: userId
    });
    console.log(details);
    useEffect(()=>{
        setCart(details);
    },[]);

    return(
        <CartContext.Provider value={{cart,setCart}} >{children}</CartContext.Provider>
    )
}

export { CartContext ,CartProvider};