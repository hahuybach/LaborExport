import { NavLink } from "react-router-dom";
import styles from "css/Navbar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faNewspaper,
  faPhone,
  faUserFriends,
} from "@fortawesome/free-solid-svg-icons";
function Navbar() {
  return (
    <nav>
      <div className={styles.logo}>
        <img src={require("img/logo.jpg")} />
      </div>
      <ul>
        <li>
          <NavLink exact to="/">
            <FontAwesomeIcon icon={faHome} /> &nbsp; Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/workers">
            <FontAwesomeIcon icon={faUserFriends} /> &nbsp; Workers
          </NavLink>
        </li>
        <li>
          <NavLink to="/news">
            <FontAwesomeIcon icon={faNewspaper} /> &nbsp; News
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact">
            <FontAwesomeIcon icon={faPhone} /> &nbsp;Contact
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
export default Navbar;
