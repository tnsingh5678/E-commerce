import { createContext , useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

const CartContext = createContext();

const CartProvider = async ({children})=>{
    const [ cart , setCart ] = useState([]);

    const { user } = useContext(UserContext);
    const userId = user.userId;
    const getDetails = async ()=>{
        if( !userId){
            toast.error("User not found");
            return;
        }
        try {
            const response = await axios.get('http://localhost:4000/auth/user',{
                params: userId
            });
            return response.data
        } catch (error) {
            toast.error("Cart not found")
        }
    }
    useEffect(()=>{
        const fetchDetails = async ()=>{
            const details = await getDetails();
            if(details){
                console.log(details);
                setCart(details);
            }else{
                console.log("Cart not found !!!")
            }
        }
        fetchDetails();
        
    },[userId])
    
    

    return(
        <CartContext.Provider value={{cart,setCart}} >{children}</CartContext.Provider>
    )
}

export { CartContext ,CartProvider};