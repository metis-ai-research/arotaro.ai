import "./css/NavBar.scss";
import logo from "../resources/header-logo.png";

export default function NavBar() {
  return (
    <header className="navagation-container">
      <div className="nav-bar">
        <img src={logo} alt="logo" className="header-logo" />
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
    </header>
  );
}
