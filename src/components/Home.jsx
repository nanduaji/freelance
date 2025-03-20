import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap
import styles from "./Home.module.css";
import { Button } from "react-bootstrap";
import { FaBed, FaUtensils, FaSpa, FaGift, FaBook, FaCalendarCheck } from "react-icons/fa";

function Home() {

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
                            fontSize: "22px",
                            fontWeight: "400",
                            color: "#2c2c2c",
                            lineHeight: "1.7",
                            letterSpacing: "0.5px"
                        }}>
                            <b> With 870 exquisite rooms ranging from 600 AED to 4000 AED per day, City Grand Hotel
                                offers unparalleled luxury and service, ideal for every traveler.
                            </b>
                        </p>

                        <Button className={styles.custombutton}><b>Book Your Stay</b></Button>

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

                        <div className="mt-5" style={{ backgroundColor: "#e2edec", padding: "20px", borderRadius: "10px" }}>
                            <h1 className={styles.title}>Unmatched Services to Elevate Your Stay</h1>
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
                                            <p className="card-text">
                                                <h3 className="text-muted"> $ 50</h3>
                                            </p>
                                            <Button className={`${styles.oppositebutton} mt-2`}>
                                                <FaCalendarCheck className="me-2" /> <b>Book Now</b>
                                            </Button>
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
                                            <p className="card-text">
                                                <h3 className="text-muted"> $ 50</h3>
                                            </p>
                                            <Button className={`${styles.oppositebutton} mt-2`}>
                                                <FaCalendarCheck className="me-2" /> <b>Book Now</b>
                                            </Button>
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
                                            <p className="card-text">
                                                <h3 className="text-muted"> $ 50</h3>
                                            </p>
                                            <Button className={`${styles.oppositebutton} mt-2`}>
                                                <FaCalendarCheck className="me-2" /> <b>Book Now</b>
                                            </Button>
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
                                            <p className="card-text">
                                                <h3 className="text-muted"> $ 50</h3>
                                            </p>
                                            <Button className={`${styles.oppositebutton} mt-2`}>
                                                <FaCalendarCheck className="me-2" /> <b>Book Now</b>
                                            </Button>
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
                                            <p className="card-text">
                                                <h3 className="text-muted"> $ 50</h3>
                                            </p>
                                            <Button className={`${styles.oppositebutton} mt-2`}>
                                                <FaCalendarCheck className="me-2" /> <b>Book Now</b>
                                            </Button>
                                        </div>
                                    </div>
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
