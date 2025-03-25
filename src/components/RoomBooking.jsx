import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "animate.css";
import styles from "./RoomBooking.module.css";
import { FaBed, FaCalendarAlt, FaUser, FaEnvelope, FaPhone } from "react-icons/fa";

const roomTypes = [
    {
        name: "Deluxe Suite",
        image: "delux-suite.jpg",
        description: "Spacious room with modern amenities and a city view.",
        amenities: [
            "King-size bed",
            "Free Wi-Fi",
            "Flat-screen TV",
            "Mini-bar",
            "24/7 room service"
        ],
        price: "100"
    },
    {
        name: "Presidential Suite",
        image: "presidential-suite.jpg",
        description: "Luxurious suite with a private balcony and premium services.",
        amenities: [
            "Private balcony",
            "Jacuzzi",
            "Personal butler service",
            "Complimentary breakfast",
            "High-speed internet"
        ],
        price: "100"
    },
    {
        name: "Luxury Villa",
        image: "luxury-villa.jpg",
        description: "Exclusive villa with a private pool and garden view.",
        amenities: [
            "Private pool",
            "Garden view",
            "Fully equipped kitchen",
            "Outdoor seating area",
            "Smart home automation"
        ],
        price: "1"
    },
];

const RoomBooking = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        guests: "",
        date: "",
        roomType: roomTypes[0].name,
        specialRequests: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.phone || !formData.guests || !formData.date) {
            toast.error("❌ Please fill all required fields!");
            return;
        }
        toast.success("✅ Booking details saved! Redirecting to payment...");
        setTimeout(() => navigate("/payment"), 2000);
    };

    const handleSelectRoom = (room) => {
        // Stringify the room object before storing it in localStorage
        localStorage.setItem("room", JSON.stringify(room));
        // Update the room type in formData based on selected room
        setFormData((prevData) => ({
            ...prevData,
            roomType: room.name
        }));
    };

    return (
        <Container className="d-flex flex-column justify-content-center align-items-center mt-5" style={{ minHeight: "100vh" }}>
            <h1 className="text-center mb-4 booking-heading">
                Book Your Stay With Us
            </h1>

            <Row className="w-100">
                <Col md={6} className="overflow-auto" style={{ maxHeight: "90vh" }}>
                    {roomTypes.map((room) => (
                        <Card
                            key={room.name}
                            className={`mb-3 shadow-sm ${styles['room-card']}`}
                            onClick={() => handleSelectRoom(room)}
                            style={{cursor:'pointer'}}
                        >
                            <Card.Img variant="top" src={room.image} alt={room.name} />
                            <Card.Body>
                                <Card.Title>{room.name} - ${room.price}</Card.Title>
                                <Card.Text>{room.description}</Card.Text>
                                <ul>
                                    {room.amenities.map((amenity, index) => (
                                        <li key={index}>{amenity}</li>
                                    ))}
                                </ul>
                            </Card.Body>
                        </Card>
                    ))}
                </Col>

                <Col md={6}>
                    <div style={{ position: "sticky", top: "20px" }}>
                        <Card className="shadow-lg p-4 rounded animate__animated animate__fadeInUp">
                            <Card.Body>
                                <Card.Title className="text-center mb-4">✨ Book Your Stay ✨</Card.Title>
                                <Form onSubmit={handleSubmit}>
                                    <Row>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label><FaUser /> Full Name</Form.Label>
                                                <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label><FaEnvelope /> Email</Form.Label>
                                                <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label><FaPhone /> Phone</Form.Label>
                                                <Form.Control type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label><FaUser /> Guests</Form.Label>
                                                <Form.Control type="number" name="guests" value={formData.guests} onChange={handleChange} required />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label><FaCalendarAlt /> Check-in Date</Form.Label>
                                                <Form.Control type="date" name="date" value={formData.date} onChange={handleChange} required />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label><FaBed /> Room Type</Form.Label>
                                                <Form.Select name="roomType" value={formData.roomType} onChange={handleChange} disabled>
                                                    {roomTypes.map((room) => (
                                                        <option key={room.name} value={room.name}>
                                                            {room.name}
                                                        </option>
                                                    ))}
                                                </Form.Select>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Special Requests</Form.Label>
                                        <Form.Control as="textarea" rows={3} name="specialRequests" value={formData.specialRequests} onChange={handleChange} />
                                    </Form.Group>

                                    <div className="text-center">
                                        <Button type="submit" className="w-100 p-3 mt-3">Proceed to Payment</Button>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default RoomBooking;
