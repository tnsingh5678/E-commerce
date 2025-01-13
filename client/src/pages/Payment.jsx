import React, { useState } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";

const Payment = (props) => {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    const amount = props.amount;

    try {
      const response = await axios.post('http://localhost:4000/cart/payment', {
        amount,
      });

      const { id } = response.data;

      const options = {
        key: process.env.RAZORPAY_SECRET_KEY, 
        amount: props.amount,
        currency: 'INR',
        order_id: id,
        handler: function (response) {
          toast.success("Payment successful");
          console.log(response);
        },
        prefill: {
          name: props.customerName,
          email: props.email,
          contact: props.phone,
        },
        theme: {
          color: '#3399cc',
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Error creating payment', error);
      toast.error("Payment failed");
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Payment Page</h2>
        <p className="text-center text-lg text-gray-600 mb-8">
          Pay securely using Razorpay
        </p>
        
        <div className="flex justify-center">
          <button
            onClick={handlePayment}
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-semibold transition-colors duration-300 
              ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {loading ? 'Processing...' : 'Pay Now'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
