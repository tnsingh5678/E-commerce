import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";

export default function Item() {
    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [price, setPrice] = useState(100);
    const [open, setOpen] = useState(false);
    const [option, setOption] = useState('');
    const [categoryOpen, setCategoryOpen] = useState(false);
    const [cart, setCart] = useState([]); // Initialize cart as an empty array
    const { user } = useContext(UserContext);
    
    
    

    const category = ["Accessories", "Electronics", "Cosmetics", "Grocery"];

    const getItem = async () => {
        const response = await axios.get('http://localhost:4000/product/');
        setItems(response.data.items);
    };

    useEffect(() => {
        getItem();
    }, []);

    const getByCategory = async (category) => {
        const response = await axios.get('http://localhost:4000/product/filter/category', {
            params: { category }
        });
        setItems(response.data.items);
    };

    const getByPrice = async (price) => {
        const response = await axios.get('http://localhost:4000/product/filter/price', {
            params: { price }
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
            alert('Please enter a valid price');
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
        // Check if the item already exists in the cart
        const existingItem = cart.find(cartItem => cartItem._id === item._id);
        if (existingItem) {
            alert('Item already in cart');
            return;
        }

        const newCart = [...cart, item];
        setCart(newCart);
        alert(`${item.itemName} added to cart`);
    };

    const purchaseItems = async () => {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }

        try {
            for (const item of cart) {
                console.log(item.itemId)
                console.log(item.price)
                console.log(user.userId)
                console.log(item.quantity)
                const response = await axios.post('http://localhost:4000/cart/additem', {
                    userId :user.userId,
                    itemId: item.itemId,
                    quantity: item.quantity,
                    price: item.price,
                    
                });
            }
            alert('Purchase Successful!');
            setCart([]); // Clear the cart after successful purchase
        } catch (error) {
            alert('Error purchasing items');
            console.error(error);
        }
    };

    return (
        <>
            {/* Sort Dropdown */}
            <div className="relative m-4">
                <button
                    onClick={toggleDropDown}
                    className="py-2 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg shadow-md hover:bg-purple-700 focus:outline-none transition duration-300 ease-in-out"
                >
                    {option || 'Sort By'}
                </button>

                {open && (
                    <ul className="absolute left-0 mt-2 w-56 bg-white border border-gray-300 rounded-lg shadow-lg z-10 divide-y divide-gray-200">
                        <li className="px-4 py-2 text-gray-700 hover:bg-yellow-200 cursor-pointer" onClick={getItem}>All</li>
                        <li className="px-4 py-2 text-gray-700 hover:bg-yellow-200 cursor-pointer" onClick={toggleCategoryDropDown}>
                            Categories
                            {categoryOpen && (
                                <ul className="mt-2 ml-4">
                                    {category.map((cat, index) => (
                                        <li
                                            key={index}
                                            className="px-4 py-2 text-gray-700 hover:bg-yellow-200 cursor-pointer"
                                            onClick={() => setOptionCategory(cat)}
                                        >
                                            {cat}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    </ul>
                )}
            </div>

            {/* Price Input Field */}
            <div className="m-4">
                <label className="block text-gray-700 text-lg font-semibold mb-2">
                    Enter Price:
                </label>
                <input
                    type="number"
                    placeholder="Enter price"
                    value={price}
                    onChange={handlePriceChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={handlePriceSearch}
                    className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none transition duration-300"
                >
                    Search
                </button>
            </div>

            {/* Items Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {items.length > 0 ? (
                    items.map((item) => (
                        <div key={item._id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105">
                            {/* Item Image */}
                            <div className="mb-4">
                                <img
                                    src={item.Urls[0]}
                                    alt={item.itemName}
                                    className="w-full h-40 object-cover rounded-lg"
                                />
                            </div>
                            
                            {/* Item Details */}
                            <h3 className="text-xl font-semibold text-gray-800 hover:text-purple-600 transition duration-300">{item.itemName}</h3>
                            <p className="text-gray-600 mt-2">ID: <span className="font-medium text-indigo-600">{item.itemId}</span></p>
                            <p className="text-gray-600">Quantity: <span className="font-medium text-indigo-600">{item.quantity}</span></p>
                            <p className="text-xl font-bold text-green-600 mt-2">Price: ${item.price}</p>

                            {/* Add to Cart Button */}
                            <button
                                onClick={() => addToCart(item)}
                                className="mt-4 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 focus:outline-none transition duration-300"
                            >
                                Add to Cart
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-center col-span-3 text-gray-500">No items found</p>
                )}
            </div>

            {/* Cart and Purchase Section */}
            {cart.length > 0 && (
                <div className="fixed bottom-10 right-10 bg-green-600 text-white p-4 rounded-lg shadow-lg">
                    <p className="text-lg font-semibold">Items in Cart: {cart.length}</p>
                    <button
                        onClick={purchaseItems}
                        className="mt-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 focus:outline-none transition duration-300"
                    >
                        Purchase Items
                    </button>
                </div>
            )}
        </>
    );
}
