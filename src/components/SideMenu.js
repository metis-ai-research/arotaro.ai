import "./css/SideMenu.scss";

export default function SideMenu(props) {
  return (
    <div className={`overlay-menu ${props.isMenuOpen ? "open" : ""}`}>
      <ul className="nav-links-side">
        <li>
          <div className="close-button" onClick={props.toggleMenu}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
        </li>
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
  );
}
