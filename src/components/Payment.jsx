import React from "react";
import { Button } from "react-bootstrap";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

 const stripePromise = loadStripe("your-publishable-key-here");

function Payment() {
    return (
        <Elements stripe={stripePromise}>
            <div className="container text-center mt-5">
                <h2>Secure Payment</h2>
                <p>Proceed with your payment to confirm the booking.</p>
                <CheckoutForm />
            </div>
        </Elements>
    );
}

export default Payment;
