import "./MainSection.scss";
import Man from "../../resources/home-man.png";
import Lisa from "../../resources/Lisa.png";
import map from "../../resources/map.png";
import books from "../../resources/books.png";
import password from "../../resources/password.png";
import QuestionMark from "../../resources/question-mark.png";
import ButtonRow from "../../components/ButtonRow";
import IconCard from "./IconCard";
import Ball1 from "../../resources/shapes/Ball1.png";
import Torus1 from "../../resources/shapes/Torus_a2.png";
import Torus2 from "../../resources/shapes/Torus_a3.png";
import Octahedron from "../../resources/shapes/Octahedron_a1.png";

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
        <img src={QuestionMark} alt="question-mark" className="question-mark" />
      </div>
      <div className="second-section">
        <img src={Lisa} alt="home-woman" className="home-woman" />
        <div className="card-section">
          <h2 className="second-slogon">아로타로 ai는 뭐가 특별한가요?</h2>
          <div className="icon-cards-container">
            <IconCard
              icon={map}
              title="접근성"
              className="map-icon"
              content="당신이 필요한 순간, 언제든지 어디에서나 예약 없이도 바로 이용 가능합니다."
            />
            <IconCard
              icon={books}
              title="전문성"
              className="books-icon"
              content="방대한 데이터로 훈련받아 정교한 타로 리딩으로 당신의 고민을 상담 할 수 있습니다."
            />
            <IconCard
              icon={password}
              title="프라이빗"
              className="password-icon"
              content="다른 사람들에게 공유하기 힘든 고민이나 개인적인 이야기들을 할수있습니다."
            />
          </div>
        </div>
        <img src={Torus1} className="torus-in-main" alt="torus" />
        <img src={Octahedron} className="octahedron-in-main" alt="octahedron" />
        <img src={Torus2} className="torus2-in-main" alt="torus" />
      </div>
      <img src={Ball1} className="ball-in-main" alt="ball" />
    </div>
  );
}
