import "./css/NavBar.scss";
import logo from "../resources/header-logo.png";
import { useState } from "react";
import SideMenu from "./SideMenu";

export default function NavBar() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };
  return (
    <header className="navagation-container">
      <div className="nav-bar">
        <img src={logo} alt="logo" className="header-logo" />
        <div className="hamburger-menu" onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
        <ul className="nav-links nav-for-home">
          <li>
            <a href="#home">홈</a>
          </li>
          <li>
            <a href="#home">프로모션</a>
          </li>
          <li>
            <a href="#home">Coming soon</a>
          </li>
          <li>
            <a href="#home">문의</a>
          </li>
        </ul>
      </div>
      <SideMenu toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
    </header>
  );
}
