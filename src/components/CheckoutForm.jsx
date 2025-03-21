import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "react-bootstrap";

function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        if (!stripe || !elements) return;

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
        });

        if (error) {
            console.error(error);
            setLoading(false);
        } else {
            console.log("Payment successful", paymentMethod);
            alert("Payment Successful!");
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-3">
            <CardElement className="p-3 border rounded" />
            <Button type="submit" className="mt-3" disabled={loading}>
                {loading ? "Processing..." : "Pay Now"}
            </Button>
        </form>
    );
}

export default CheckoutForm;
