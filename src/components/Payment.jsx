import React from "react";
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";

const Payment = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Payment Details:", data);
    alert("Payment submitted successfully!");
  };

  return (
    <Container className="d-flex justify-content-center mt-4">
      <Card style={{ width: "30rem", padding: "20px" }}>
        <Card.Body>
          <Card.Title className="text-center">
            💳 Step 3: Payment Details
          </Card.Title>

          <Form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Row className="mb-3">
              <Col xs={12}>
                <Form.Group controlId="firstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    {...register("firstName", { required: "First name is required" })}
                    isInvalid={!!errors.firstName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.firstName?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col xs={12}>
                <Form.Group controlId="lastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    {...register("lastName", { required: "Last name is required" })}
                    isInvalid={!!errors.lastName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.lastName?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col xs={12}>
                <Form.Group controlId="cardNumber">
                  <Form.Label>Card Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="0000 0000 0000 0000"
                    {...register("cardNumber", {
                      required: "Card number is required",
                      pattern: { value: /^\d{16}$/, message: "Enter a valid 16-digit card number" },
                    })}
                    isInvalid={!!errors.cardNumber}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.cardNumber?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col xs={6}>
                <Form.Group controlId="expiryDate">
                  <Form.Label>Expiry Date (MM/YY)</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="MM/YY"
                    {...register("expiryDate", {
                      required: "Expiry date is required",
                      pattern: { value: /^(0[1-9]|1[0-2])\/\d{2}$/, message: "Enter a valid expiry date (MM/YY)" },
                    })}
                    isInvalid={!!errors.expiryDate}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.expiryDate?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col xs={6}>
                <Form.Group controlId="cvv">
                  <Form.Label>Security Code (CVV)</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="000"
                    {...register("cvv", {
                      required: "Security code is required",
                      pattern: { value: /^\d{3}$/, message: "Enter a valid 3-digit CVV" },
                    })}
                    isInvalid={!!errors.cvv}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.cvv?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <div className="text-center">
              <Button type="submit" variant="primary">
                Pay Now
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Payment;
