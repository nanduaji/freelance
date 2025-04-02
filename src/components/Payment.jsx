import React, { useState, useEffect, useRef } from "react";
import { Modal, Button, Card, Container, Spinner, ProgressBar, Alert, Row, Col, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, CardElement, PaymentElement } from "@stripe/react-stripe-js";
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
  //  { id: "paypal", name: "PayPal", icon: "🅿️" },
  // { id: "crypto", name: "Crypto", icon: "₿" },
  //  { id: "bank_transfer", name: "Bank", icon: "🏦" },
  { id: "stripe_link", name: "Stripe Link", icon: "🔗" },
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
  const roomDetails = JSON.parse(localStorage.getItem("bookings"))?.[0]; // Get first booking
  console.log("roomDetails", roomDetails)
  const roomName = localStorage.getItem("roomName") || "Luxury Suite";
  const roomDescription = localStorage.getItem("roomDescription") || "A premium room with breathtaking views.";
  const roomImage = roomDetails?.roomDetails?.image || "https://source.unsplash.com/800x400/?luxury,hotel"; // Default image
  // const guestCount = parseInt(roomDetails?.guests, 10) || 1; // Default 1 guest
  const roomQuantity = parseInt(roomDetails?.roomQuantity, 10) || 1; // Default 1 room
  const pricePerNight = parseFloat(roomDetails?.roomDetails?.price) || 100; // Default price

  // Convert check-in and check-out dates to JavaScript Date objects
  const checkinDate = new Date(roomDetails?.checkinDate);
  const checkoutDate = new Date(roomDetails?.checkoutDate);

  // Calculate the number of days (ensure at least 1 day is charged)
  const timeDiff = checkoutDate - checkinDate;
  const daysBooked = timeDiff > 0 ? Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) : 1;

  // Calculate total price
  const totalPrice = pricePerNight * daysBooked * roomQuantity;

  return (
    <Container className="d-flex justify-content-center mt-5 mb-5">
      <Card className="room-details-card glassmorphism-card shadow-lg overflow-hidden" style={{ maxWidth: "500px", borderRadius: "15px" }}>
        <Card.Img variant="top" src={roomImage} alt="Room Image" className="room-image" />

        <Card.Body className="text-center p-4">
          <h3 className="fw-bold text-gold">{roomName}</h3>
          <p className="text-muted mb-3">{roomDescription}</p>

          <div className="d-flex flex-wrap justify-content-center gap-2 mt-3">
            <Badge pill bg="primary" className="fs-6 px-4 py-2 shadow-sm">
              🏠 Rooms: {roomQuantity}
            </Badge>
            <Badge pill bg="warning" className="fs-6 px-4 py-2 shadow-sm">
              📅 Nights: {daysBooked}
            </Badge>
          </div>

          <div className="mt-4">
            <Badge pill bg="success" className="fs-5 px-4 py-2 shadow-lg">
              {new Intl.NumberFormat("en-AE", { style: "currency", currency: "AED" }).format(totalPrice)}
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
  const [paymentRequestButton, setPaymentRequestButton] = useState(null);

  // Create a PaymentRequest for Apple Pay
  useEffect(() => {
    if (!stripe) return;

    const roomDetails = JSON.parse(localStorage.getItem("bookings"));
    console.log("Room Details:", roomDetails);

    if (
      !roomDetails ||
      !roomDetails[0].roomDetails.price ||
      !roomDetails[0].checkinDate ||
      !roomDetails[0].checkoutDate ||
      // !roomDetails[0].guests ||
      !roomDetails[0].roomQuantity
    ) {
      toast.error("❌ Missing booking details!", { autoClose: 5000 });
      return;
    }

    // Convert check-in and check-out dates to JavaScript Date objects
    const checkinDate = new Date(roomDetails[0].checkinDate);
    const checkoutDate = new Date(roomDetails[0].checkoutDate);
    // const guestCount = parseInt(roomDetails[0].guests, 10) || 1; // Default 1 guest if missing
    const roomQuantity = parseInt(roomDetails[0].roomQuantity, 10) || 1; // Default 1 room if missing

    console.log("Check-in:", checkinDate, "Check-out:", checkoutDate);
    // console.log("Guests:", guestCount, "Rooms:", roomQuantity);

    // Calculate the number of days (ensure at least 1 day is charged)
    const timeDiff = checkoutDate - checkinDate;
    const daysBooked = timeDiff > 0 ? Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) : 1;

    // Calculate total price
    const amount = roomDetails[0].roomDetails.price * daysBooked * roomQuantity;

    // console.log(
    //   `Check-in: ${checkinDate}, Check-out: ${checkoutDate}, Days: ${daysBooked}, Guests: ${guestCount}, Rooms: ${roomQuantity}, Amount: ${amount}`
    // );

    // Create Apple Pay payment request
    const paymentRequest = stripe.paymentRequest({
      country: "AE",
      currency: "aed",
      total: {
        label: "Room Booking",
        amount, // Use dynamically calculated amount
      },
      requestPayerName: true,
      requestPayerEmail: true,
    });

    paymentRequest.canMakePayment().then((result) => {
      if (result?.applePay) {
        console.log("✅ Apple Pay is supported.");
        setPaymentRequestButton(paymentRequest);
      } else {
        console.log("❌ Apple Pay is NOT supported.");
      }
    });
  }, [stripe]);

  const sendConfirmationEmail = async (email, bookingDetails, paymentIntentId) => {
    try {
      const response = await fetch("https://freelance-backend-1-51yh.onrender.com/send-confirmation-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, bookingDetails, paymentIntentId }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("📧 Confirmation email sent successfully!", { autoClose: 5000 });
      } else {
        toast.error(`❌ Email error: ${data.error}`, { autoClose: 5000 });
      }
    } catch (error) {
      console.error("Email sending failed:", error);
      toast.error("❌ Failed to send confirmation email.");
    }
  };

  const onSubmit = async () => {
    if (!stripe || !elements || !clientSecret) return;
    setLoading(true);
    setError(null);
    setProgress(30);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        // confirmParams: {
        //   // return_url: window.location.origin, 
        // },
        redirect: "if_required",
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
        const roomDetails = JSON.parse(localStorage.getItem("bookings"))?.[0];
        const email = roomDetails?.email; // Ensure email is stored in the booking
        const bookingDetails = {
          userName:roomDetails?.name || "Guest",
          roomName: roomDetails?.roomDetails?.name || "Luxury Suite",
          checkinDate: roomDetails?.checkinDate,
          checkoutDate: roomDetails?.checkoutDate,
          unitPrice: roomDetails?.roomDetails?.price,
          totalPrice: roomDetails?.roomDetails?.price * (roomDetails?.roomQuantity || 1),
          roomQuantity: roomDetails?.roomQuantity || 1,
          totalAmount: localStorage.getItem("totalAmount"),
        };

        // Send confirmation email
        await sendConfirmationEmail(email, bookingDetails, paymentIntent.id);
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
      <RoomDetailsCard />
      {showConfetti && <Confetti />}
      <Card className="payment-card glassmorphism-card">
        <Card.Body>
          <Card.Title className="text-center payment-title">💳 Secure Premium Payment</Card.Title>
          <Form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Payment Details</Form.Label>
              <div className="p-3 border rounded card-input">
                <PaymentElement /> {/* Stripe Link + Cards + Other Payment Methods */}
              </div>
            </Form.Group>
            {paymentRequestButton && (
              <div className="apple-pay-container mt-3">
                <PaymentRequestButtonElement options={{ paymentRequest: paymentRequestButton }} />
              </div>
            )}
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

    const roomDetails = JSON.parse(localStorage.getItem("bookings"));
    console.log("Room Details:", roomDetails);

    if (
      !roomDetails ||
      !roomDetails[0].roomDetails.price ||
      !roomDetails[0].checkinDate ||
      !roomDetails[0].checkoutDate ||
      // !roomDetails[0].guests ||
      !roomDetails[0].roomQuantity
    ) {
      toast.error("❌ Missing booking details!", { autoClose: 5000 });
      return;
    }

    // Convert dates to JavaScript Date objects
    const checkinDate = new Date(roomDetails[0].checkinDate);
    const checkoutDate = new Date(roomDetails[0].checkoutDate);
    // const guestCount = parseInt(roomDetails[0].guests, 10) || 1; // Default 1 guest if missing
    const roomQuantity = parseInt(roomDetails[0].roomQuantity, 10) || 1; // Default 1 room if missing

    console.log("Check-in:", checkinDate, "Check-out:", checkoutDate);
    // console.log("Guests:", guestCount, "Rooms:", roomQuantity);

    // Calculate the number of days
    const timeDiff = checkoutDate - checkinDate;
    const numDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) || 1; // Ensure at least 1 day

    // Calculate total amount
    const roomPrice = roomDetails[0].roomDetails.price;
    const totalAmount = numDays * roomPrice * roomQuantity;
    localStorage.setItem("totalAmount", totalAmount);
    console.log(`Total Amount for ${numDays} days: AED ${totalAmount}`);

    fetch("http://localhost:3001/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: totalAmount }),
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