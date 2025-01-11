import React, { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';

const PaymentComponent = (amount) => {
 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const stripe = useStripe();
    const elements = useElements();

    const handlePayment = async () => {
        setLoading(true);

        // Create a PaymentIntent on the backend
        try {
            const response = await axios.post('http://localhost:4000/cart/payment/stripe', {
                amount,
            });

            const clientSecret = response.data.clientSecret;

            // Confirm the payment with the CardElement
            const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                },
            });

            if (error) {
                setError(error.message);
            } else if (paymentIntent.status === 'succeeded') {
                alert('Payment Successful!');
            }
        } catch (error) {
            setError('Payment failed. Please try again.');
        }

        setLoading(false);
    };

    return (
        <div>
            <h2>Payment Page</h2>
            
            <CardElement />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button onClick={handlePayment} disabled={loading || !stripe || !elements}>
                {loading ? 'Processing...' : 'Pay Now'}
            </button>
        </div>
    );
};

export default PaymentComponent;
