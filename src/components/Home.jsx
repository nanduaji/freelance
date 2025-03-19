import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap
import styles from "./Home.module.css";
import { Button } from "react-bootstrap";

function Home() {
    return (
        <div className={`container-fluid ${styles.container}`}>
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
                            style={{ width: "2500px", height: "auto" }}
                        />
                        <h1 className={`${styles.title} mt-3`}>Experience Luxury at Great Wall Hotel </h1>
                        <p className="lead limited-text">
                           <b> With 870 exquisite rooms ranging from 600 AED to 4000 AED per day, City Grand Hotel
                            offers unparalleled luxury and service, ideal for every traveler.
                            </b>
                        </p>
                        <Button className={styles.custombutton}><b>Book Your Stays</b></Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
