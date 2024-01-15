import "./MainSection.scss";
import Man from "../../resources/home-man.png";
import ButtonRow from "../../components/ButtonRow";

export default function MainSection() {
  return (
    <div className="home-main-section">
      <div className="first-section">
        <div className="greeting-container">
          <h1 className="greeting-slogon">
            마음의 미로에서 길을 찾고 계신가요?
          </h1>
          <p className="greeting-content">
            혼란스럽고 어려운 순간, 아로타로 AI가 당신의 길잡이가 되어드립니다.
          </p>
          <ButtonRow type="home-button" />
        </div>
        <img src={Man} alt="home-man" className="home-man" />
      </div>
    </div>
  );
}
