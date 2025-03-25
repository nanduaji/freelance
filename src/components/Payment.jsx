import React, { useState, useEffect, useRef } from "react";
import { Modal, Button, Card, Container, Spinner, ProgressBar, Alert, Row, Col, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import Confetti from "react-confetti";
import "react-toastify/dist/ReactToastify.css";
import "./Payment.module.css";
import { motion } from "framer-motion";
import { PaymentRequestButtonElement } from "@stripe/react-stripe-js";
import { Badge } from "react-bootstrap";


const stripeKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;
const stripePromise = loadStripe(stripeKey);

// Payment options as before


const paymentOptions = [
  { id: "card", name: "Card", icon: "💳" },
  { id: "apple_pay", name: "Apple Pay", icon: "🍏" },
  { id: "google_pay", name: "Google Pay", icon: "📱" },
  { id: "paypal", name: "PayPal", icon: "🅿️" },
  { id: "crypto", name: "Crypto", icon: "₿" },
  { id: "bank_transfer", name: "Bank", icon: "🏦" },
];

const PaymentOptionsModal = ({ onSelect }) => {
  return (
    <Modal show centered backdrop="static" className="luxury-modal">
      <Modal.Header className="luxury-modal-header">
        <Modal.Title className="fw-bold text-gold">🌍 Choose Your Payment Method</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="g-4 justify-content-center">
          {paymentOptions.map((option) => (
            <Col key={option.id} xs={6} sm={4} className="text-center">
              <motion.div
                whileHover={{ scale: 1.1, boxShadow: "0px 10px 30px rgba(255, 215, 0, 0.6)" }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <Card
                  className="payment-option-card glass-effect d-flex flex-column align-items-center justify-content-center"
                  onClick={() => onSelect(option.id)} // Ensure clicking a card selects a payment method
                  style={{ cursor: "pointer" }} // Makes the card clickable
                >
                  <Card.Body className="p-4 text-center">
                    <div className="payment-icon">{option.icon}</div>
                    <p className="fw-bold text-gold mt-3">{option.name}</p>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Modal.Body>
    </Modal>
  );
};

const RoomDetailsCard = () => {
  const room = JSON.parse(localStorage.getItem("room"));
  const roomName = localStorage.getItem("roomName") || "Luxury Suite";
  const roomDescription = localStorage.getItem("roomDescription") || "A premium room with breathtaking views.";
  const roomImage = room?.image || "https://source.unsplash.com/800x400/?luxury,hotel"; // Default image

  return (
    <Container className="d-flex justify-content-center mt-5 mb-5">
      <Card className="room-details-card glassmorphism-card shadow-lg overflow-hidden" style={{ maxWidth: "500px", borderRadius: "15px" }}>
        <Card.Img variant="top" src={roomImage} alt="Room Image" className="room-image" />

        <Card.Body className="text-center">
          <h3 className="fw-bold text-gold">{roomName}</h3>
          <p className="text-muted">{roomDescription}</p>

          <div className="d-flex justify-content-center align-items-center mt-3">
            <Badge pill bg="success" className="fs-5 px-3 py-2">
              ${room?.price || "100"}
            </Badge>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

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
        setShowConfetti(true);
        toast.success("🎉 Payment successful!", { autoClose: 5000 });

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
      <RoomDetailsCard /> {/* Include the room details here */}
      <Card className="payment-card glassmorphism-card">
        <Card.Body>
          <Card.Title className="text-center payment-title">💳 Secure Premium Payment</Card.Title>
          <Form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Card Details</Form.Label>
              <div className="p-3 border rounded card-input">
                <CardElement className="p-2" />
              </div>
            </Form.Group>

            {error && <Alert variant="danger" className="text-center fade-in">{error}</Alert>}
            {success && <Alert variant="success" className="text-center fw-bold fade-in">✅ Payment successful!</Alert>}

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
  const [selectedPayment, setSelectedPayment] = useState(null);
  const clientSecretRef = useRef("");

  useEffect(() => {
    if (!selectedPayment) return;
    const roomDetails = JSON.parse(localStorage.getItem("room"));
    console.log("Room Details:", roomDetails);

    let amount = roomDetails.price
    fetch("http://localhost:3001/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: amount }),
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
  }, [selectedPayment]);

  // Show payment options first
  if (!selectedPayment) {
    return <PaymentOptionsModal onSelect={setSelectedPayment} />;
  }

  // Show loading spinner while fetching the client secret
  if (!clientSecret) {
    return (
      <Container className="loading-container text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3 text-muted">Preparing secure payment...</p>
      </Container>
    );
  }

  // Show checkout form when ready
  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm clientSecret={clientSecret} />
    </Elements>
  );
};

export default Payment;
