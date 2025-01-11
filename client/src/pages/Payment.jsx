import React, { useState } from 'react';
import axios from 'axios';
import { toast } from "react-toastify"

const Payment = ({ customerName , email , phone , amount}) => {
  const [amount, setAmount] = useState(1000); 
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);

    try {
      
      const response = await axios.post('http://localhost:4000/cart/payment', {
        amount,
      });

      const { id, currency } = response.data;

      
      const options = {
        key: process.env.RAZORPAY_SECRET_KEY, 
        amount: amount,
        currency: currency,
        order_id: id,
        handler: function (response) {
          toast.success("Payment successful")
          console.log(response);
        },
        prefill: {
          name: customerName,
          email: email,
          contact: phone,
        },
        theme: {
          color: '#3399cc',
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Error creating payment', error);
      toast.error("Payemnt failed")
    }

    setLoading(false);
  };

  return (
    <div>
      <h2>Payment Page</h2>
      
      <button onClick={handlePayment} disabled={loading}>
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
    </div>
  );
};

export default Payment;
