import { useState, useEffect , useContext } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";

export default function User() {
  
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [itemToAdd, setItemToAdd] = useState({ itemId: "", quantity: 1, price: 0 });
  const [updateQuantity, setUpdateQuantity] = useState({ itemId: "", newQuantity: 1 });

  const { user } = useContext(UserContext);
  const userId = user.userId;
  

  // Add Item to Cart
  const addItemToCart = async () => {
    try {
      const response = await axios.post("http://localhost:4000/cart/additem", {
        userId,
        itemId: itemToAdd.itemId,
        quantity: itemToAdd.quantity,
        price: itemToAdd.price
      });
      setCart(response.data.user.cart);
      alert(response.data.message);
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  // Update Item Quantity
  const updateItemInCart = async () => {
    try {
      const response = await axios.put("http://localhost:4000/cart/updateItem", {
        userId,
        itemId: updateQuantity.itemId,
        updateQuantity: updateQuantity.newQuantity
      });
      setCart(response.data.user.cart);
      alert(response.data.message);
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  // Delete Item from Cart
  const deleteItemFromCart = async (itemId) => {
    try {
      const response = await axios.delete("http://localhost:4000/cart/deleteitem", {
        data: { userId, itemId }
      });
      setCart(response.data.user.cart);
      alert(response.data.message);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  // Calculate Total Price
  useEffect(() => {
    const total = cart.reduce((acc, item) => acc + item.quantity * item.price, 0);
    setTotalPrice(total);
  }, [cart]);

  // Generate Bill
  const generateBill = async () => {
    try {
      const response = await axios.post("http://localhost:4000/cart/bill", {
        userId,
        cart
      });
      alert(response.data.message);
    } catch (error) {
      console.error("Error generating bill:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 text-center">Shopping Cart</h2>

      {/* Add Item to Cart */}
      <div className="bg-gray-50 p-4 rounded-md shadow-md">
        <h3 className="text-xl font-medium text-gray-700">Add Item to Cart</h3>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Item ID"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            value={itemToAdd.itemId}
            onChange={(e) => setItemToAdd({ ...itemToAdd, itemId: e.target.value })}
          />
          <input
            type="number"
            placeholder="Quantity"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            value={itemToAdd.quantity}
            onChange={(e) => setItemToAdd({ ...itemToAdd, quantity: e.target.value })}
          />
          <input
            type="number"
            placeholder="Price"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            value={itemToAdd.price}
            onChange={(e) => setItemToAdd({ ...itemToAdd, price: e.target.value })}
          />
          <button
            onClick={addItemToCart}
            className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Add Item
          </button>
        </div>
      </div>

      {/* Update Item in Cart */}
      <div className="bg-gray-50 p-4 rounded-md shadow-md">
        <h3 className="text-xl font-medium text-gray-700">Update Item Quantity</h3>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Item ID"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            value={updateQuantity.itemId}
            onChange={(e) => setUpdateQuantity({ ...updateQuantity, itemId: e.target.value })}
          />
          <input
            type="number"
            placeholder="New Quantity"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            value={updateQuantity.newQuantity}
            onChange={(e) => setUpdateQuantity({ ...updateQuantity, newQuantity: e.target.value })}
          />
          <button
            onClick={updateItemInCart}
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Update Item
          </button>
        </div>
      </div>

      {/* Cart Items */}
      <div className="bg-gray-50 p-4 rounded-md shadow-md">
        <h3 className="text-xl font-medium text-gray-700">Items in Cart</h3>
        <ul className="space-y-4">
          {cart.map((item, index) => (
            <li key={index} className="flex justify-between items-center p-4 bg-white rounded-md shadow-sm">
              <div>
                <p className="font-semibold text-gray-800">Item ID: {item.itemId}</p>
                <p className="text-gray-600">Quantity: {item.quantity}</p>
                <p className="text-gray-600">Price: ${item.price}</p>
              </div>
              <button
                onClick={() => deleteItemFromCart(item.itemId)}
                className="text-red-600 hover:text-red-800 font-semibold"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Total Price */}
      <div className="flex justify-between items-center bg-gray-50 p-4 rounded-md shadow-md">
        <p className="text-lg font-semibold text-gray-800">Total Price:</p>
        <p className="text-lg font-bold text-green-600">${totalPrice}</p>
      </div>

      {/* Generate Bill */}
      <div>
        <button
          onClick={generateBill}
          className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Generate Bill
        </button>
      </div>
    </div>
  );
}
