import { NavLink } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBell } from "@fortawesome/free-solid-svg-icons";
import styles from "../css/Home.module.scss";
function Home() {
  return (
    <h1>HomePage</h1>
    // <Row>
    //   <Col sm={8}>
    //     <div className="heading">
    //       <h1>
    //         Good morning, <span style={{ color: "blue" }}>Dr Nunez</span>
    //       </h1>
    //       <p>
    //         I hope you are in a good mood because there are 128 patients waiting
    //         for you
    //       </p>
    //     </div>
    //     <div className={styles.schedule}>Schedule</div>
    //     <div className={styles.patient_list}>Patient list</div>
    //     <Row className="justify-content-around">
    //       <Col sm={5} className={styles.pharmacy_order}>
    //         Pharmacy Order
    //       </Col>
    //       <Col sm={5} className={styles.new_opinion}>
    //         News Opinion
    //       </Col>
    //     </Row>
    //   </Col>
    //   <Col sm={4} className="home_right">
    //     <div className={`d-flex justify-content-around ${styles.home_right}`}>
    //       <div className={styles.search_patient}>
    //         {/* <FontAwesomeIcon icon={faSearch} /> */}
    //         <input placeholder="Search patients" />
    //       </div>
    //       <div className={styles.noti}>
    //         <FontAwesomeIcon icon={faBell} />
    //       </div>
    //     </div>
    //   </Col>
    // </Row>
  );
}
export default Home;
