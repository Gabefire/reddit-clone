import DropDownNav from "./drop-down-nav";
import { Link } from "react-router-dom";
import "./header.css";
import mainIcon from "../assets/reddit-circle.svg";
import chevronDown from "../assets/chevron-down.svg";
import home from "../assets/home.svg";
import magnify from "../assets/magnify.svg";

export default function Header() {
  return (
    <div id="header">
      <div id="title">
        <img src={mainIcon} alt="site symbol" />
        <h3>Fake Forum</h3>
      </div>

      <div id="search-items">
        <nav id="drop-down-menu">
          <div id="icons">
            <Link to="/home">
              <div id="home-icons">
                <img src={home} alt="home icon" />
                <div>Home</div>
              </div>
            </Link>
            <img src={chevronDown} alt="expand menu" />
          </div>
          <div id="menu">
            <DropDownNav />
          </div>
        </nav>
        <div id="search-bar">
          <img src={magnify} />
          <input type="text" />
        </div>
      </div>

      {/*If login show name and icon*/}
      <div id="user-icons">
        <button id="login-btn">Login</button>
      </div>
    </div>
  );
}
