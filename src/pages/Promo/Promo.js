import React, { useState } from "react";
import "./Promo.scss";
import NavBar from "../../components/NavBar";
import ButtonRow from "../../components/ButtonRow";
import Gem from "../../resources/gem.png";
import Calendar from "../../resources/calendar.png";
import Hearts from "../../resources/double-heart-left.png";
import Balloons from "../../resources/double-heart-right.png";
import Torus2 from "../../resources/shapes/promo-torus2.png";
import Cube from "../../resources/shapes/promo-cube.png";
import Spiral from "../../resources/shapes/promo-spiral.png";
import Ball from "../../resources/shapes/promo-ball.png";
import Cube2 from "../../resources/shapes/promo-cube2.png";
import Spiral2 from "../../resources/shapes/promo-spiral2.png";
import Torus1 from "../../resources/shapes/promo-torus1.png";
import Cones from "../../resources/shapes/promo-cones.png";
import Cone from "../../resources/shapes/promo-cone.png";
import Firework from "../../resources/firework.png";
import Lisa from "../../resources/lisa-2.png";
import GlobalFooter from "../../components/GlobalFooter";
import { useTranslation } from "react-i18next";

export default function Promo() {
  const { t } = useTranslation();
  const [langurage, setLangurage] = useState("한국어");

  return (
    <div className="promo-main-container">
      <NavBar pageName="promo" />
      <img src={Torus2} className="torus2-in-promo" alt="icon" />
      <img src={Cube} className="cube-in-promo" alt="icon" />
      <div className="promo-first-container">
        <img src={Hearts} className="hearts-in-promo" alt="icon" />
        <div className="promo-greeting-container">
          <h1 className="promo-greeting-slogan">
            다가오는 발렌타인데이,
            <br />
            사랑의 운세가 궁금하세요?
          </h1>
          <p className="promo-greeting-content">
            새롭게 출시한 '아로타로' 앱을 다운받아서{" "}
            <br className="br-for-mobile" />
            당신의 사랑을
            <br className="br-for-desktop" /> 타로 카드로 점을 쳐보세요!
          </p>
          <img src={Spiral} className="spiral-in-promo" alt="icon" />
          <ButtonRow type="promo-button" />
        </div>
        <img src={Calendar} className="calendar-in-promo" alt="icon" />
        <img src={Balloons} className="balloons-in-promo" alt="icon" />
      </div>
      <div className="promo-second-container">
        <img src={Ball} className="ball-in-promo" alt="icon" />
        <img src={Cube2} className="cube2-in-promo" alt="icon" />
        <img src={Spiral2} className="spiral2-in-promo" alt="icon" />
        <div className="promo-white-container">
          <img src={Gem} className="gem-in-promo" alt="icon" />
          <div className="white-content-container">
            <img src={Firework} className="firework-in-promo" alt="icon" />
            <div className="event-div">Event 1</div>
            <h3>새 앱 출시 기념,</h3>
            <h4>젬 충전 최대 40% 세일!</h4>
            <lable>
              지금 바로 앱을 다운로드하고, 발렌타인 스페셜 프로모션
              <br className="br-for-desktop" /> 으로 젬 충전 시 최대 40% 할인
              혜택을 누려보세요.
            </lable>
            <p>
              이벤트 기간:
              <br className="br-for-mobile" /> 2024년 2월 1일 ~ 2월 14일
            </p>
          </div>
        </div>
      </div>
      <div className="promo-third-container">
        <img src={Cones} className="cones-in-promo" alt="icon" />
        <img src={Cone} className="cone-in-promo" alt="icon" />
        <img src={Torus1} className="torus1-in-promo" alt="icon" />
        <div className="promo-white-container reverse-on-mobile">
          <div className="white-content-container">
            <div className="event-div">Event 2</div>
            <h3>당신의 타로 경험을 나누세요!</h3>
            <h4>리뷰쓰고 선물받자!</h4>
            <lable>
              앱 스토어에 리뷰를 작성해 주신 분들 중 랜덤으로 선정하
              <br className="br-for-desktop" />
              여 10명에게 각각 젬 10개를 선물로 드립니다. 리뷰를 작성
              <br className="br-for-desktop" />
              하고 당신의 행운을 확인하세요.
            </lable>
            <p>
              참여 기간:
              <br className="br-for-mobile" />
              2024년 2월 1일 ~ 2월 29일
              <br className="br-for-desktop" />
              <br className="br-for-mobile" />
              당첨 발표: 3월 5일
            </p>
          </div>
          <img src={Lisa} className="lisa-in-promo" alt="icon" />
        </div>
      </div>
      <ul className="promo-ul">
        <li>
          아로타로는 예상치 못한 상황이나 실제 또는 예상된 법률 위반, 앱의
          통제를 벗어난 사건이 발생할 경우 또는 프로모션 참여가 예상보다 낮을
          경우 등<br />
          어떠한 이유로든 예고 없이 프로모션을 취소하거나 조기 종료할 권리를
          보유합니다.
        </li>
        <li>
          10개의 젬 보상은 이전할 수 없으며 현금이나 기타 대안으로 교환될 수
          없습니다.
        </li>
        <li>
          본 프로모션과 관련된 질문이나 명확히 할 사항이 있으면
          support@arotaro.ai 로 우리 지원팀에 연락 주시기 바랍니다.
        </li>
      </ul>
      <GlobalFooter setLangurage={setLangurage} langurage={langurage} />
    </div>
  );
}
