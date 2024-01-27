import React, { useState } from "react";
import "./Support.scss";
import NavBar from "../../components/NavBar";
import GlobalFooter from "../../components/GlobalFooter";
import SupportContentItem from "./SupportContentItem";
import { useTranslation } from "react-i18next";

export default function Support() {
  const { t } = useTranslation();
  const [langurage, setLangurage] = useState("한국어");
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [currentMenu, setCurrentMenu] = useState(0);

  const handleItemClick = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const data = [
    { title: "타로 카드는 어떻게 사용되나요?", content: "Content for Item 1" },
    {
      title: "어떤 주제로 질문을 하는게 좋을까요?",
      content: `타로 카드는 자신의 내면을 탐색하고 선택의 교차로에서 맞는 방향으로 가고자 할 때 다양한 질문을 던질 수 있는 도구입니다. 여기 몇 가지 예시를 들어보겠습니다:
                <br /><ul><li>1. 요새 제 일상이 하루하루 비슷하고 지루해요. 이직을 고려해 볼 만한 적절한 시점이 언제일까요?</li>
                <li>2. 오랫동안 교제해 온 그 사람과 관계를 한 단계 더 발전시키고 싶어요. 그/그녀의 마음 속에는 어떤 생각이 있을까요?</li>
                <li>3. 내 커리어의 성장에 있어서 내가 해야할 다음 단계는 무엇일까?</li>
                <li>4. 다음달 중요한 면접이 있는데 내가 여기서 뭘 더 준비하면 좋을까?</li>
                <li>5. 나의 장애물이나 어려움을 극복하기 위해 어떠한 조언을 얻을 수 있을까?</li>
                <li>6. 몇년째 연봉이 오르질않아. 어떻게 하면 연봉인상을 받을 수 있을까?</li>
                <li>7. 최근 마음에 드는 사람이 생겼어. 그/그녀에게 어떻게 다가가는게 좋을까?</li>
                </ul>
                타로는 이와 같이 개인의 깊은 내면적 질문부터 구체적인 일상의 결정까지, 광범위한 주제에 대해 성찰하고 자문을 구할 수 있는 도구입니다. 그러나 당신의 질문은 당신의 현재 필요와 상황에 맞춰 개인화될 수 있으므로, 진지하게 고민하고 있는걸 마이타로 리더와 함께 이야기보세요.`,
    },
    {
      title: "효과적인 조언을 들으려면 어떠한 방식으로 상황 설명을 해야할까요?",
      content: "Content for Item 3",
    },
    {
      title: "타로 카드에게 어떤 질문을 하면 명확한 해결책을 찾을 수 있을까요?",
      content: "Content for Item 3",
    },
  ];

  const menuData = ["자주 묻는 질문", "이용약관", "개인정보처리방침"];

  return (
    <div className="support-main-container">
      <NavBar pageName="support" />
      <div className="support-greeting-container">
        <h1 className="support-h1">{t("support-h1")}</h1>
        <h2 className="support-greeting">{t("support-greeting")}</h2>
      </div>
      <div className="support-white-container">
        <div className="support-content-items">
          {currentMenu === 0
            ? data.map((item, index) => (
                <SupportContentItem
                  onClick={() => handleItemClick(index)}
                  isOpen={expandedIndex === index}
                  title={item.title}
                  content={item.content}
                />
              ))
            : null}
          {currentMenu === 1 ? (
            <div className="support-second-content">
              <h3>이용약관</h3>
              <p dangerouslySetInnerHTML={{ __html: data[1].content }}></p>
            </div>
          ) : null}
        </div>
        <div className="support-menu-container">
          {menuData.map((item, index) => (
            <div className="support-menu-item-bar">
              <div
                className={[
                  "menu-left-div",
                  index === currentMenu ? "menu-active" : "",
                ].join(" ")}
              ></div>
              <div
                className="support-menu-item"
                key={index}
                onClick={() => setCurrentMenu(index)}
              >
                {item}
              </div>
            </div>
          ))}
        </div>
      </div>
      <GlobalFooter setLangurage={setLangurage} langurage={langurage} />
    </div>
  );
}
