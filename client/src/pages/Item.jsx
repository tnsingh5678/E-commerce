import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import ProductCard from "../components/ProductCard";

export default function Item() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]); 
  const [price, setPrice] = useState(100);
  const [open, setOpen] = useState(false);
  const [option, setOption] = useState('');
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [cart, setCart] = useState([]); 
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  
  const category = ["INC","DEC"];

  const getItem = async () => {
    const response = await axios.get('http://localhost:4000/product/');
    setItems(response.data.items);
  };

  useEffect(() => {
    getItem();
    setCategories(category);
  }, []);

  const getByCategory = async (category) => {
    const response = await axios.get('http://localhost:4000/product/filter/category', {
      params: { category },
    });
    setItems(response.data.items);
  };

  const getByPrice = async (price) => {
    const response = await axios.get('http://localhost:4000/product/filter/price', {
      params: { price },
    });
    setItems(response.data.items);
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    setPrice(value);
  };

  const handlePriceSearch = () => {
    if (price && !isNaN(price)) {
      getByPrice(price);
    } else {
      toast.error('Please enter a valid price');
    }
  };

  const toggleDropDown = () => {
    setOpen(!open);
  };

  const toggleCategoryDropDown = () => {
    setCategoryOpen(!categoryOpen);
  };

  const setOptionCategory = (category) => {
    setOption(category);
    setCategories([category]); 
    setCategoryOpen(false);
    getByCategory(category);
  };

  const setOptionPrice = (price) => {
    setOption(price);
    setPrice(price);
    getByPrice(price);
    setOpen(false);
  };

  const addToCart = (item) => {
    
    const existingItem = cart.find(cartItem => cartItem._id === item._id);
    if (existingItem) {
      toast.error('Item already in cart');
      return;
    }

    const newCart = [...cart, item];
    setCart(newCart);
    toast.success(`${item.itemName} added to cart`);
  };

  const purchaseItems = async () => {
    if (cart.length === 0) {
      toast.error('Your cart is empty!');
      return;
    }

    try {
      let total = 0;
      for (const item of cart) {
        const response = await axios.post('http://localhost:4000/cart/additem', {
          userId: user.userId,
          itemId: item.itemId,
          quantity: item.quantity,
          price: item.price,
        });
        total += item.price * item.quantity;
      }

      navigate('/purchase', { state: { total } });
      toast.success('Purchase Successful!');
      setCart([]);
    } catch (error) {
      toast.error('Error purchasing items');
      console.error(error);
    }
  };

 
  return (
    <>
      <div className="dropdown bg-gray-500 border border-r-8" onClick={toggleDropDown}>
        Sort By
      </div>
      {open && (
        <div className="bg-slate-400 w-400px h-400px">
          {categories.map((category, index) => (
            <li
              key={index}
              className="bg-blue-500 border border-r-8 m-2 p-2"
              onClick={() => setOptionCategory(category)}
            >
              {category}
            </li>
          ))}
        </div>
      )}
      {items.length > 0 ? (
        items.map((item, index) => (
          <ProductCard
            key={index}
            itemName={item.itemName}
            quantity={item.quantity}
            price={item.price}
            Urls={item.Urls}
            addToCart={addToCart} // Pass the addToCart function to ProductCard
          />
        ))
      ) : (
        <p>No items available</p>
      )}
    </>
  );
}
