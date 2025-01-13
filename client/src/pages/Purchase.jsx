import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { toast } from "react-toastify";
import Payment from "./Payment";

export default function Purchase() {
    const [items, setItems] = useState([]);

    const { user } = useContext(UserContext);
    const userId = user.userId;
    const { amount } = location.state || {};

    const PurchaseHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:4000/cart/bill', {
                userId,
                items
            });
            console.log(res);
            toast.success("Product purchased successfully");
        } catch (error) {
            console.log("error while purchasing the item: ", error.message);
            toast.error("Error while purchasing item");
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex justify-center items-center p-4">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Purchase Information</h2>

                <div className="mb-6 space-y-3">
                    <div className="flex justify-between">
                        <p className="text-lg text-gray-700">User ID:</p>
                        <p className="text-lg font-medium text-gray-900">{user.userId}</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="text-lg text-gray-700">Email:</p>
                        <p className="text-lg font-medium text-gray-900">{user.email}</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="text-lg text-gray-700">Name:</p>
                        <p className="text-lg font-medium text-gray-900">{user.name}</p>
                    </div>
                </div>

                <Payment amount={amount} email={user.email} customerName={user.name} phone={user.phone} />

                <div className="mt-6 flex justify-center">
                    <button 
                        onClick={PurchaseHandler} 
                        className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:bg-gray-400"
                    >
                        Order Now
                    </button>
                </div>
            </div>
        </div>
    );
}
