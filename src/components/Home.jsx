import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap
import styles from "./Home.module.css";
import { Button } from "react-bootstrap";
import { FaBed, FaUtensils, FaSpa, FaGift, FaBook, FaCalendarCheck, FaWhatsapp, FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

function Home() {
    const navigate = useNavigate();

    const handleBookNow = () => {
        navigate("/roombooking");
    };
    const [mapSize, setMapSize] = useState({
        width: "90%",
        height: "250px",
    });

    useEffect(() => {
        const updateSize = () => {
            if (window.innerWidth > 768) {
                setMapSize({ width: "500px", height: "350px" });
            } else {
                setMapSize({ width: "100%", height: "250px" });
            }
        };

        updateSize();
        window.addEventListener("resize", updateSize);

        return () => window.removeEventListener("resize", updateSize);
    }, []);
    const testimonials = [
        {
            src: "John.webp",
            text: "A beautifully designed hotel room with stunning views.",
            name: "John Doe",
            designation: "Travel Blogger",
        },
        {
            src: "Sarah.jpeg",
            text: "Guests enjoying a gourmet dining experience in our restaurant.",
            name: "Sarah Smith",
            designation: "Food Critic",
        },
        {
            src: "Emily.webp",
            text: "Tranquil spa treatment room ready for relaxation.",
            name: "Emily White",
            designation: "Wellness Coach",
        },
        {
            src: "Michael.avif",
            text: "A well-arranged conference room during a business event.",
            name: "Michael Brown",
            designation: "Event Coordinator",
        },
    ];
    return (
        <div className={`container-fluid ${styles.container} mt-5`}>
            <div className={`row justify-content-center`}>
                <div className={`col-md-6 col-lg-4 ${styles.secondcontainer} p-4`}>
                    <div className={`text-center ${styles.thirdcontainer}`}>
                        <img
                            src="./pexels-photo-509685.jpeg"
                            alt="Hotel"
                            className={`${styles.firstimage} img-fluid rounded shadow-lg`}
                        />
                        <h1 className={`${styles.title} mt-3`}>Great Wall Hotel</h1>
                        <img
                            src="https://images.pexels.com/photos/161758/governor-s-mansion-montgomery-alabama-grand-staircase-161758.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                            alt="Mansion"
                            className="img-fluid rounded mt-3"
                            style={{ width: "100%", maxWidth: "1200px", height: "auto" }}
                        />
                        <h1 className={`${styles.title} mt-3`}>Experience Luxury at Great Wall Hotel </h1>
                        <p className="lead limited-text" style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: "24px",
                            fontWeight: "700",
                            color: "#2c2c2c",
                            lineHeight: "1.7",
                            letterSpacing: "0.5px"
                        }}>
                            <p style={{fontSize: "20px", fontWeight: "bold"}} > "Unparalleled Comfort at an Unbeatable Price" – Experience world-class hospitality 
                                in our 200 exquisite rooms, designed for both leisure and business travelers, 
                                starting at just 320 AED per night.
                            </p>
                        </p>

                        <Button className={styles.custombutton} onClick={handleBookNow}><b>Book Your Stay</b></Button>

                        <Button className={`${styles.oppositebutton} mt-5`}>
                            <FaBed className="me-2" /> <b>Explore Our Rooms</b>
                        </Button>
                        <Button className={`${styles.oppositebutton} mt-2`}>
                            <FaUtensils className="me-2" /> <b>Dining Options</b>
                        </Button>
                        <Button className={`${styles.oppositebutton} mt-2`}>
                            <FaSpa className="me-2" /> <b>Spa Services</b>
                        </Button>
                        <Button className={`${styles.oppositebutton} mt-2`}>
                            <FaGift className="me-2" /> <b>Special Offers</b>
                        </Button>

                        <div className="mt-5" style={{ fontFamily: "'Playfair Display', serif", backgroundColor: "#e2edec", padding: "20px", borderRadius: "10px" }}>
                            <h3 className={styles.title}>Experience More Than Just a Stay</h3>
                            {/* Cards Section */}
                            <div className="card p-3">
                                <div className="row g-0 align-items-center">
                                    {/* Image on the left */}
                                    <div className="col-md-4">
                                        <img className="img-fluid rounded" src="pexels-photo-164595.jpeg" alt="Card image cap" />
                                    </div>

                                    {/* Text on the right */}
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h5 className="card-title">Luxurious Accomodations</h5>
                                            <p className="card-text">
                                                Enjoy a range of room options designed for comfort and elegance, catering to all budgets and preferences.

                                            </p>
                                          {/*<p className="card-text">
                                                <h3 className="text-muted"> $ 50</h3>
                                            </p>
                                            <Button className={`${styles.oppositebutton} mt-2`} >
                                                <FaCalendarCheck className="me-2" /> <b>Book Now</b>
                                            </Button>*/}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card p-3 mt-5">
                                <div className="row g-0 align-items-center">
                                    {/* Image on the left */}
                                    <div className="col-md-4">
                                        <img className="img-fluid rounded" src="finedining.webp" alt="Card image cap" />
                                    </div>

                                    {/* Text on the right */}
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h5 className="card-title">Fine Dining</h5>
                                            <p className="card-text">
                                                Savor gourmet meals prepared by top chefs in our world-class restaurant, offering international cuisine.

                                            </p>
                                            {/*<p className="card-text">
                                                <h3 className="text-muted"> $ 50</h3>
                                            </p>
                                            <Button className={`${styles.oppositebutton} mt-2`}>
                                                <FaCalendarCheck className="me-2" /> <b>Book Now</b>
                                            </Button>*/}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card p-3 mt-5">
                                <div className="row g-0 align-items-center">
                                    {/* Image on the left */}
                                    <div className="col-md-4">
                                        <img className="img-fluid rounded" src="spa.jpeg" alt="Card image cap" />
                                    </div>

                                    {/* Text on the right */}
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h5 className="card-title">Spa & Wellness
                                            </h5>
                                            <p className="card-text">
                                                Indulge in relaxing treatments at our upscale spa, designed to refresh and rejuvenate your body and mind.
                                            </p>
                                            {/*<p className="card-text">
                                                <h3 className="text-muted"> $ 50</h3>
                                            </p>
                                            <Button className={`${styles.oppositebutton} mt-2`}>
                                                <FaCalendarCheck className="me-2" /> <b>Book Now</b>
                                            </Button>*/}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card p-3 mt-5">
                                <div className="row g-0 align-items-center">
                                    {/* Image on the left */}
                                    <div className="col-md-4">
                                        <img className="img-fluid rounded" src="conference.jpeg" alt="Card image cap" />
                                    </div>

                                    {/* Text on the right */}
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h5 className="card-title">Conference Facilities
                                            </h5>
                                            <p className="card-text">
                                                Host your events in our fully equipped conference rooms, suitable for business meetings and gatherings.
                                            </p>
                                            {/*<p className="card-text">
                                                <h3 className="text-muted"> $ 50</h3>
                                            </p>
                                            <Button className={`${styles.oppositebutton} mt-2`}>
                                                <FaCalendarCheck className="me-2" /> <b>Book Now</b>
                                            </Button>*/}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card p-3 mt-5">
                                <div className="row g-0 align-items-center">
                                    {/* Image on the left */}
                                    <div className="col-md-4">
                                        <img className="img-fluid rounded" src="pexels-photo-164595.jpeg" alt="Card image cap" />
                                    </div>

                                    {/* Text on the right */}
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h5 className="card-title">Pool and Recreation
                                            </h5>
                                            <p className="card-text">
                                                Relax and unwind at our stunning outdoor pool and recreation area, perfect for leisure and family fun.

                                            </p>
                                            {/*<p className="card-text">
                                                <h3 className="text-muted"> $ 50</h3>
                                            </p>
                                            <Button className={`${styles.oppositebutton} mt-2`}>
                                                <FaCalendarCheck className="me-2" /> <b>Book Now</b>
                                            </Button>*/}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-5">
                            <h1 style={{ color: '#527577' }}>Welcome to Great Wall Hotel, Your Luxury Oasis</h1>
                            <img
                                src="coverphoto.jpeg"
                                alt="Cover Photo"
                                className="img-fluid rounded mt-3"
                                style={{ width: "100%", maxWidth: "1200px", height: "auto" }}
                            />
                            <p className="lead limited-text mt-3" style={{
                                fontFamily: "'Cormorant Garamond', serif",
                                fontSize: "22px",
                                fontWeight: "400",
                                color: "#2c2c2c",
                                lineHeight: "1.7",
                                letterSpacing: "0.5px"
                            }}>
                                <b> "Great Wall Hotel is a sanctuary of timeless elegance, where opulent interiors, world-class amenities, and impeccable service come together to create an experience of unparalleled sophistication and comfort"
                                </b>
                            </p>
                            <Button className={styles.custombutton} ><b>Discover More</b></Button>
                        </div>
                        <div className="mt-5 text-center">
                            <h1 style={{ color: '#527577' }}>Gallery Of Excellence And Comfort</h1>
                            <div className="container py-4">
                                <div className="row justify-content-center">
                                    {[
                                        { src: "card1.jpeg", text: "A beautifully designed hotel room with stunning views." },
                                        { src: "card2.jpeg", text: "Guests enjoying a gourmet dining experience in our restaurant." },
                                        { src: "card3.jpeg", text: "Tranquil spa treatment room ready for relaxation." },
                                        { src: "card4.jpeg", text: "A well-arranged conference room during a business event." },
                                        { src: "card5.jpeg", text: "Refreshing outdoor swimming pool area for guests." },
                                        { src: "card6.webp", text: "Spacious and inviting lobby area for guests." }
                                    ].map((item, index) => (
                                        <div key={index} className="col-12 col-md-6 col-lg-6 d-flex justify-content-center mb-4">
                                            <div className="p-3" style={{ width: '20rem', border: 'none', overflow: 'hidden' }}>
                                                <img
                                                    className="card-img-top"
                                                    src={item.src}
                                                    alt="Gallery item"
                                                    style={{ height: '300px', borderRadius: '10px', objectFit: 'cover' }}
                                                />
                                                <div className="card-body d-flex align-items-center justify-content-center">
                                                    <p className="card-text text-center">{item.text}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                            </div>
                            <Button className={styles.custombutton} ><b>See All Pictures</b></Button>
                        </div>

                        <div className="mt-5" style={{ backgroundColor: "#527577" }}>
                            <h1 style={{ color: 'white', padding: '20px', wordWrap: 'break-word' }}>
                                Book Your Luxurious Escape <br /> Today
                            </h1>
                            <p className="large p-2 mb-2" style={{ color: 'white' }}>Don't miss out on a chance to indulge in unparalleled luxury and comfort. Reserve your room now to experience all that Great Wall Hotel has to offer.</p>
                            {/*<Button
                                className={`${styles.oppositebutton} mt-5 mb-5`}
                                style={{
                                    width: '50%'
                                }}
                            >
                                <FaCalendarCheck /> <span>Reserve Now</span>
                            </Button>*/}

                        </div>
                        <div
                            className="py-5"
                            style={{
                                background: "linear-gradient(to right, #f8f9fa, #e2edec)",
                            }}
                        >
                            <h1 className={`${styles.title} mt-3 text-center fw-bold mb-4`} >
                                What Our Guests Are Saying
                            </h1>
                            <div className="container">
                                <div className="row justify-content-center">
                                    {testimonials.map((item, index) => (
                                        <div key={index} className="col-12 col-md-8 col-lg-6 mb-4">
                                            <div
                                                className="card p-4 border-0 shadow-lg"
                                                style={{
                                                    background: "white",
                                                    borderRadius: "15px",
                                                }}
                                            >
                                                <p
                                                    className="card-text mb-3 text-muted"
                                                    style={{
                                                        fontStyle: "italic",
                                                        fontSize: "1.1rem",
                                                        lineHeight: "1.6",
                                                        fontFamily: "'Merriweather', serif",
                                                    }}
                                                >
                                                    “{item.text}”
                                                </p>
                                                <div className="d-flex align-items-center">
                                                    {/* Bootstrap Avatar */}
                                                    <img
                                                        src={item.src}
                                                        alt={item.name}
                                                        className="rounded-circle border"
                                                        style={{
                                                            width: 60,
                                                            height: 60,
                                                            objectFit: "cover",
                                                            border: "3px solid #c9a227",
                                                            marginRight: 15,
                                                        }}
                                                    />
                                                    <div>
                                                        <h6 className="mb-1 fw-bold">{item.name}</h6>
                                                        <span
                                                            className="badge"
                                                            style={{
                                                                backgroundColor: "#c9a227",
                                                                color: "white",
                                                                padding: "6px 10px",
                                                                borderRadius: "10px",
                                                                fontSize: "0.9rem",
                                                            }}
                                                        >
                                                            {item.designation}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="mt-5">
                            <h1 className={`${styles.title} mt-3 text-center fw-bold mb-4`}>
                                Get In Touch with Us
                            </h1>
                            <Button
                                className={`${styles.custombutton} `}
                                style={{
                                    width: "60%",
                                    padding: "10px 15px",
                                }}
                            >
                                <FaWhatsapp size={20} /> <b>Connect On Whatsapp</b>
                            </Button>
                        </div>
                        <div className="mt-5 text-center">
                            <h2 className={`${styles.title} mt-3 fw-bold mb-4`}>OR</h2>
                            <form className="mt-4 mx-auto" style={{ maxWidth: "500px" }}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label"></label>
                                    <input
                                        type="text"
                                        className="form-control mx-auto"
                                        id="name"
                                        placeholder="Enter your name"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label"></label>
                                    <input
                                        type="email"
                                        className="form-control mx-auto"
                                        id="email"
                                        placeholder="Enter your email"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="message" className="form-label"></label>
                                    <textarea
                                        className="form-control mx-auto"
                                        id="message"
                                        rows="4"
                                        placeholder="Enter your message"
                                    ></textarea>
                                </div>
                                <Button type="submit" className={`${styles.custombutton} w-100`}>
                                    Submit
                                </Button>
                            </form>
                        </div>
                        <div className="mt-5  text-center" style={{ backgroundColor: "#e2edec" }}>


                            {/* Contact Details */}
                            <div className="container p-5">
                                <h1 className={`${styles.title} mt-3 fw-bold mb-4`}>Reach Out To Us Here</h1>
                                <div className="row justify-content-center">
                                    {[
                                        { icon: <FaPhone size={30} />, title: "Phone", value: "+971 568899009" },
                                        { icon: <FaEnvelope size={30} />, title: "Gmail", value: "moh.ibr.gom@gmail.com" },
                                        { icon: <FaMapMarkerAlt size={30} />, title: "Location", value: (
                                            <>
                                              Dubai International City, Dubai <br />
                                              United Arab Emirates
                                            </>
                                          ) },
                                        { icon: <FaClock size={30} />, title: "Timing", value: "24/7 Availability" },
                                    ].map((item, index) => (
                                        <div key={index} className="col-md-5 col-12 d-flex flex-column align-items-center mb-4">
                                            <div className="p-3 bg-white rounded-circle shadow d-flex align-items-center justify-content-center" style={{ width: "60px", height: "60px" }}>
                                                {item.icon}
                                            </div>
                                            <h5 className="mt-3 fw-bold" style={{ color: "#65868b" }}>{item.title}</h5>
                                            <p className="text-muted">{item.value}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Map Section */}
                            <div className="container mt-4">
                                <div className="row justify-content-center">
                                    <div className="col-md-10 col-12">
                                        <div style={{ width: "100%", margin: "0 auto" }}>
                                            <iframe
                                                title="Google Map"
                                                className="map"
                                                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d4288.7353782516275!2d55.37557013826775!3d25.324952638082056!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f614eb88deb71%3A0x1639bd9727e18e15!2sDubai%20International%20City%20-%20Dubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sin!4v1743233455328!5m2!1sen!2sin"
                                                style={{
                                                    width: mapSize.width,
                                                    height: mapSize.height,
                                                    border: "0",
                                                    borderRadius: "10px",
                                                    boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
                                                    display: "block",
                                                    margin: "0 auto",
                                                }}
                                                allowFullScreen=""
                                                loading="lazy"
                                            ></iframe>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Social Media Icons */}
                            <div className="mt-4 p-5">
                                <h5 className="fw-bold" style={{ color: "#65868b" }}>Follow Us</h5>
                                <div className="d-flex justify-content-center gap-3 mt-3">
                                    <a href="#" className="text-dark"><FaFacebook size={30} /></a>
                                    <a href="#" className="text-dark"><FaTwitter size={30} /></a>
                                    <a href="#" className="text-dark"><FaInstagram size={30} /></a>
                                    <a href="#" className="text-dark"><FaLinkedin size={30} /></a>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;

