import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { Modal, Button, Card, Container, Spinner, ProgressBar, Alert, Row, Col, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import Confetti from "react-confetti";
import "react-toastify/dist/ReactToastify.css";
import "./Payment.module.css";
import { motion } from "framer-motion";
import { PaymentRequestButtonElement } from "@stripe/react-stripe-js";
import { Badge } from "react-bootstrap";
import { googlePayConfig } from './googlePayConfig';
const stripeKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;
const stripePromise = loadStripe(stripeKey);

const paymentOptions = [
  { id: "card", name: "Card", icon: "💳" },
  { id: "apple_pay", name: "Apple Pay", icon: "🍏" },
  { id: "google_pay", name: "Google Pay", icon: "📱" },
  { id: "stripe_link", name: "Stripe Link", icon: "🔗" },
];
const handleOptionSelect = (onSelect, option) => {
  onSelect(option.id);
  localStorage.setItem("selectedPayment", option.id);
}
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
                  onClick={() => handleOptionSelect(onSelect, option)}
                  style={{ cursor: "pointer" }}
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
  const roomDetails = JSON.parse(localStorage.getItem("bookings"))?.[0];
  const roomName = localStorage.getItem("roomName") || "Luxury Suite";
  const roomDescription = localStorage.getItem("roomDescription") || "A premium room with breathtaking views.";
  const roomImage = roomDetails?.roomDetails?.image || "https://source.unsplash.com/800x400/?luxury,hotel";
  const roomQuantity = parseInt(roomDetails?.roomQuantity, 10) || 1;
  const pricePerNight = parseFloat(roomDetails?.roomDetails?.price) || 100;

  const checkinDate = new Date(roomDetails?.checkinDate);
  const checkoutDate = new Date(roomDetails?.checkoutDate);

  const timeDiff = checkoutDate - checkinDate;
  const daysBooked = timeDiff > 0 ? Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) : 1;

  const basePrice = pricePerNight * daysBooked * roomQuantity;

  const VAT = basePrice * 0.05;
  const tourismFee = 10 * daysBooked;
  const serviceCharge = basePrice * 0.10;
  const municipalityFee = basePrice * 0.07;

  const totalPrice = basePrice + VAT +  tourismFee + serviceCharge + municipalityFee;

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
  const buttonRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const [success, setSuccess] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [paymentRequestButton, setPaymentRequestButton] = useState(null);

  useEffect(() => {
    if (!stripe) return;

    const roomDetails = JSON.parse(localStorage.getItem("bookings"));

    if (
      !roomDetails ||
      !roomDetails[0].roomDetails.price ||
      !roomDetails[0].checkinDate ||
      !roomDetails[0].checkoutDate ||
      !roomDetails[0].roomQuantity
    ) {
      toast.error("❌ Missing booking details!", { autoClose: 5000 });
      return;
    }

    const checkinDate = new Date(roomDetails[0].checkinDate);
    const checkoutDate = new Date(roomDetails[0].checkoutDate);
    const roomQuantity = parseInt(roomDetails[0].roomQuantity, 10) || 1;

    const daysBooked = Math.max(
      1,
      Math.ceil((checkoutDate - checkinDate) / (1000 * 60 * 60 * 24))
    );
    console.log("roomDetails", roomDetails[0].roomDetails.price);
    const basePrice = roomDetails[0].roomDetails.price * daysBooked * roomQuantity;
    const VAT = basePrice * 0.05;
    const tourismFee = 10 * daysBooked;
    const serviceCharge = basePrice * 0.1;
    const municipalityFee = basePrice * 0.07;
    console.log("basePrice", basePrice);
    console.log("VAT", VAT);
    console.log("tourismFee", tourismFee);
    console.log("serviceCharge", serviceCharge);
    console.log("municipalityFee", municipalityFee);
    const totalPrice =
      basePrice + VAT + tourismFee + serviceCharge + municipalityFee;
    console.log("totalPrice", totalPrice);
    const finalAmount = Math.round(totalPrice); 

    console.log("Final Amount:", finalAmount);
    const paymentRequest = stripe.paymentRequest({
      country: "AE",
      currency: "aed",
      total: {
        label: "Room Booking",
        amount:finalAmount,
      },
      requestPayerName: true,
      requestPayerEmail: true,
    });

    paymentRequest.canMakePayment().then((result) => {
      if (result?.applePay) {
        setPaymentRequestButton(paymentRequest);
      }
    });

    // Google Pay
    const paymentsClient = new window.google.payments.api.PaymentsClient({
      environment: 'TEST', // Change to PRODUCTION for live
    });

    paymentsClient.isReadyToPay(googlePayConfig(finalAmount.toString()))
      .then(response => {
        if (response.result) {
          const button = paymentsClient.createButton({
            onClick: async () => {
              try {
                const paymentData = await paymentsClient.loadPaymentData(googlePayConfig(finalAmount.toString()));
                const token = JSON.parse(paymentData.paymentMethodData.tokenizationData.token).id;

                const { data } = await axios.post('https://freelance-backend-1-51yh.onrender.com/create-payment-intent-google-pay', {
                  amount: finalAmount,
                  token: token,
                });

                if (data.success && data.status === 'succeeded') {
                  alert('✅ Payment Successful!');
                  setShowConfetti(true);
                  const roomDetails = JSON.parse(localStorage.getItem("bookings"))?.[0];
                  const email = roomDetails?.email;
                  const bookingDetails = {
                    userName: roomDetails?.name || "Guest",
                    roomName: roomDetails?.roomDetails?.name || "Luxury Suite",
                    checkinDate: roomDetails?.checkinDate,
                    checkoutDate: roomDetails?.checkoutDate,
                    unitPrice: roomDetails?.roomDetails?.price,
                    totalPrice: roomDetails?.roomDetails?.price * (roomDetails?.roomQuantity || 1),
                    roomQuantity: roomDetails?.roomQuantity || 1,
                    totalAmount: localStorage.getItem("totalPrice"),
                    VAT: (roomDetails?.roomDetails?.price * 0.05) || 0,
                    tourismFee: 10 * (roomDetails?.roomQuantity || 1) || 0,
                    serviceCharge: (roomDetails?.roomDetails?.price * 0.1) || 0,
                    municipalityFee: (roomDetails?.roomDetails?.price * 0.07) || 0,
                  };

                  await sendConfirmationEmail(email, bookingDetails, "GooglePay");
                  setTimeout(() => {
                    setShowConfetti(false);
                  }, 10000);
                } else {
                  alert('❌ Payment Failed!');
                }
              } catch (err) {
                console.error('Google Pay Error:', err);
                alert('❌ Payment Error: ' + err.message);
              }
            }
          });

          if (buttonRef.current) {
            buttonRef.current.innerHTML = '';
            buttonRef.current.appendChild(button);
          }
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
        const email = roomDetails?.email;
        const bookingDetails = {
          userName: roomDetails?.name || "Guest",
          roomName: roomDetails?.roomDetails?.name || "Luxury Suite",
          checkinDate: roomDetails?.checkinDate,
          checkoutDate: roomDetails?.checkoutDate,
          unitPrice: roomDetails?.roomDetails?.price,
          totalPrice: roomDetails?.roomDetails?.price * (roomDetails?.roomQuantity || 1),
          roomQuantity: roomDetails?.roomQuantity || 1,
          totalAmount: localStorage.getItem("totalPrice"),
          VAT: (roomDetails?.roomDetails?.price * 0.05) || 0,
          tourismFee: 10 * (roomDetails?.roomQuantity || 1) || 0,
          serviceCharge: (roomDetails?.roomDetails?.price * 0.1) || 0,
          municipalityFee: (roomDetails?.roomDetails?.price * 0.07) || 0,
        };

        await sendConfirmationEmail(email, bookingDetails, paymentIntent.id);
        setTimeout(() => {
          setShowConfetti(false);
        }, 10000);
      }
    } catch (err) {
      setError("Something went wrong.");
      toast.error("❌ Payment failed. Please try again.", { autoClose: 5000 });
    }
  };
  const selectedPayment = localStorage.getItem("selectedPayment") || "card";
  return (
    <Container className="payment-container">
      <RoomDetailsCard />
      {showConfetti && <Confetti />}

      {selectedPayment === "card" && (
        <Card className="payment-card glassmorphism-card">
          <Card.Body>
            <Card.Title className="text-center payment-title">
              💳 Secure Premium Payment
            </Card.Title>
            <Form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Payment Details</Form.Label>
                <div className="p-3 border rounded card-input">
                  <PaymentElement />
                </div>
              </Form.Group>

              {error && (
                <Alert
                  variant="danger"
                  className="text-center fade-in"
                >
                  {error}
                </Alert>
              )}
              {success && (
                <Alert
                  variant="success"
                  className="text-center fw-bold fade-in"
                >
                  ✅ Payment successful!
                </Alert>
              )}
              {loading && (
                <ProgressBar
                  now={progress}
                  animated
                  striped
                  variant="success"
                  className="mb-3"
                />
              )}
              <div className="text-center">
                <Button
                  type="submit"
                  variant="dark"
                  disabled={!stripe || loading}
                  className="pay-button"
                >
                  {loading ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    "💎 Pay Securely"
                  )}
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      )}

      {selectedPayment === "apple_pay" && (
        <>
          {paymentRequestButton ? (
            <div className="apple-pay-container mt-4 text-center">
              <h2 className="fw-bold text-gold mb-4"> Pay Instantly with Apple Pay</h2>
              <div className="glassmorphism-card p-4 d-inline-block">
                <PaymentRequestButtonElement
                  options={{ paymentRequest: paymentRequestButton }}
                />
              </div>
              <p className="mt-3 text-muted small fst-italic">
                Seamless · Secure · Private
              </p>
            </div>
          ) : (
            <div className="fallback-container text-center mt-4">
              <img src="apple_pay.png" alt="No Apple Pay" style={{ maxWidth: "120px" }} />
              <p className="fw-bold text-danger mt-3">Apple Pay is not available on this device.</p>
              <p className="text-muted small">Try another payment method.</p>
            </div>
          )}
        </>
      )}

      {selectedPayment === "google_pay" && (
        <>
          {window?.google ? (
            <div className="google-pay-container text-center mt-4">
              <h2 className="fw-bold text-gold mb-4">Google Pay</h2>
              <div className="glassmorphism-card p-4 d-inline-block">
                <div ref={buttonRef} className="google-pay-button-wrapper"></div>
              </div>
              <p className="mt-3 text-muted small fst-italic">
                Fast · Secure · 1-Click Checkout
              </p>
            </div>
          ) : (
            <div className="fallback-container text-center mt-4">
              <img src="/no-google-pay.svg" alt="No Google Pay" style={{ maxWidth: "120px" }} />
              <p className="fw-bold text-danger mt-3">Google Pay is not available on this device.</p>
              <p className="text-muted small">Try another payment method.</p>
            </div>
          )}
        </>
      )}

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

    if (
      !roomDetails ||
      !roomDetails[0].roomDetails.price ||
      !roomDetails[0].checkinDate ||
      !roomDetails[0].checkoutDate ||
      !roomDetails[0].roomQuantity
    ) {
      toast.error("❌ Missing booking details!", { autoClose: 5000 });
      return;
    }

    const checkinDate = new Date(roomDetails[0].checkinDate);
    const checkoutDate = new Date(roomDetails[0].checkoutDate);
    const roomQuantity = parseInt(roomDetails[0].roomQuantity, 10) || 1;

    const timeDiff = checkoutDate - checkinDate;
    const numDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) || 1;

    const roomPrice = roomDetails[0].roomDetails.price;
    const basePrice = numDays * roomPrice * roomQuantity;

    const VAT = basePrice * 0.05;
    const tourismFee = 10 * numDays;
    const serviceCharge = basePrice * 0.10;
    const municipalityFee = basePrice * 0.07;

    const totalPrice = basePrice + VAT + tourismFee + serviceCharge + municipalityFee;

    localStorage.setItem("totalPrice", totalPrice);

    fetch("https://freelance-backend-1-51yh.onrender.com/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: totalPrice }),
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
        toast.error("❌ Error fetching payment details!", { autoClose: 5000 });
      });
  }, [selectedPayment]);

  if (!selectedPayment) {
    return <PaymentOptionsModal onSelect={setSelectedPayment} />;
  }

  if (!clientSecret) {
    return (
      <Container className="loading-container text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3 text-muted">Preparing secure payment...</p>
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