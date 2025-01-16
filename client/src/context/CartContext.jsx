import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios'; 
import { UserContext } from "./UserContext";
import { toast } from 'react-toastify'; 

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { user } = useContext(UserContext);

  
  const userId = user ? user.userId : null;

  const getDetails = async () => {
    if (!userId) {
      toast.error("User not found");
      return null; 
    }

    try {
      const response = await axios.get(`http://localhost:4000/auth/user/${userId}`);
      return response.data;
    } catch (error) {
      toast.error("Error fetching cart");
      return null; 
    }
  };

  useEffect(() => {
    const fetchDetails = async () => {
      if (userId) { 
        const details = await getDetails();
        if (details) {
          console.log(details);
          setCart(details.cart || []); 
        } else {
          console.log("Cart not found");
        }
      }
    };

    fetchDetails();
  }, [userId]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider, CartContext };
