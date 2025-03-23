import React, { useState, useEffect, useRef } from "react";
import { Form, Button, Card, Container, Spinner, ProgressBar, Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import Confetti from "react-confetti";
import "react-toastify/dist/ReactToastify.css";
import "./Payment.module.css"; // Importing custom styling

const stripeKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;
const stripePromise = loadStripe(stripeKey);

const CheckoutForm = ({ clientSecret }) => {
  const { handleSubmit } = useForm();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);

  const [success, setSuccess] = useState(false);
const [showConfetti, setShowConfetti] = useState(false);

const onSubmit = async () => {
  if (!stripe || !elements || !clientSecret) return;
  setLoading(true);
  setError(null);
  setProgress(30);

  try {
    const cardElement = elements.getElement(CardElement);
    setProgress(60);

    const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: cardElement },
    });

    setLoading(false);
    setProgress(100);

    if (error) {
      setError(error.message);
      toast.error(`❌ Payment failed: ${error.message}`, { autoClose: 5000 });
    } else {
      setSuccess(true);
      setShowConfetti(true); // Start confetti
      toast.success("🎉 Payment successful!", { autoClose: 5000 });

      // Stop confetti after 10 seconds
      setTimeout(() => {
        setShowConfetti(false);
      }, 10000);
    }
  } catch (err) {
    setError("Something went wrong.");
    toast.error("❌ Payment failed. Please try again.", { autoClose: 5000 });
    console.error("Payment error:", err);
  }
};


  return (
    <Container className="payment-container">
      {showConfetti && <Confetti />}


      <Card className="payment-card">
        <Card.Body>
          <Card.Title className="text-center payment-title">💳 Secure Premium Payment</Card.Title>

          <Form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Card Details</Form.Label>
              <div className="p-3 border rounded card-input">
                <CardElement className="p-2" />
              </div>
            </Form.Group>

            {error && <Alert variant="danger" className="text-center">{error}</Alert>}
            {success && <Alert variant="success" className="text-center fw-bold">✅ Payment successful!</Alert>}

            {loading && <ProgressBar now={progress} animated striped variant="success" className="mb-3" />}

            <div className="text-center">
              <Button type="submit" variant="dark" disabled={!stripe || loading} className="pay-button">
                {loading ? <Spinner animation="border" size="sm" /> : "💎 Pay Securely"}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

const Payment = () => {
  const [clientSecret, setClientSecret] = useState("");
  const clientSecretRef = useRef("");

  useEffect(() => {
    fetch("http://localhost:3001/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 100000 }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.clientSecret) {
          if (clientSecretRef.current !== data.clientSecret) {
            clientSecretRef.current = data.clientSecret;
            setClientSecret(data.clientSecret);
          }
        } else {
          toast.error("❌ Failed to get client secret!", { autoClose: 5000 });
        }
      })
      .catch((err) => {
        console.error("Error fetching clientSecret:", err);
        toast.error("❌ Error fetching payment details!", { autoClose: 5000 });
      });
  }, []);

  if (!clientSecret) {
    return (
      <Container className="loading-container">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm clientSecret={clientSecret} />
    </Elements>
  );
};

export default Payment;
