import { useState } from "react";
import "./Support.scss";
import NavBar from "../../components/NavBar";
import GlobalFooter from "../../components/GlobalFooter";
import SupportContentItem from "./SupportContentItem";
import { useTranslation } from "react-i18next";
import Ball from "../../resources/shapes/support-ball.png";
import Cube from "../../resources/shapes/support-cube.png";
import Spiral from "../../resources/shapes/support-spiral.png";

export default function Support() {
  const { t } = useTranslation();
  const [langurage, setLangurage] = useState("한국어");
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [currentMenu, setCurrentMenu] = useState(0);

  const handleItemClick = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const data = [
    {
      title: "타로 카드는 어떻게 사용되나요?",
      content: `
        타로 카드는 다양한 방식으로 사용될 수 있습니다. 여기에는 몇 가지 일반적인 사용 방법이 포함되어 있습니다:
      <br />
      <ul><li>1. 예측 및 점술:</ul>
              <li style="padding-left: 20px;">타로는 미래에 대한 예측이나 현재 상황에 대한 통찰력을 얻는 도구로 사용됩니다. 각 카드는 특정 의미와 상징을 가지며, 그것들의 조합은 특정 질문에 대한 답을 제공할 수 있습니다.</li>
      </li>
      <ul><li>2. 자기 탐구 및 심리적 성장:</ul>
              <li  style="padding-left: 20px;">타로는 자기 탐구와 심리적인 성장에 활용될 수 있습니다. 각 카드는 특정 테마나 심리적 측면을 나타내므로, 자기 자신을 더 잘 이해하고 개선하고자 하는 데 도움이 될 수 있습니다.</li>
      </li>
     <ul><li>3. 의사소통과 상담:</ul>
              <li  style="padding-left: 20px;">타로는 대화의 도구로 활용될 수 있습니다. 카드는 상담사와 커뮤니케이션 중에 내담자의 관점을 이해하고 의사소통을 돕기 위해 사용될 수 있습니다.</li>
      </li>
      <ul><li>4. 명상과 집중:</ul>
              <li  style="padding-left: 20px;">타로 카드를 사용하여 명상이나 집중력을 향상시킬 수 있습니다. 카드를 통해 얻은 이미지나 상징은 정신적인 평화와 내면을 이해하는데 사용될 수 있습니다.</li>
      </li>

        `,
    },
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
      content: `
                  <br /><ul><li>1. 상황 설명하기</li></ul>
                  <ul><li>2. 타로 리딩 시, 내담자의 상황을 명확히 전달하려면 누구와(Who), 언제(When), 어디에서(Where), 무슨 일을(What), 어떤 방식으로(How), 왜(Why) 등의 주요 질문 요소를 활용하는 것이 좋습니다. 이렇게 육하원칙을 적용하면, 내담자의 상황을 타로 리더가 이해하는 데 큰 도움이 됩니다.
                  </br>
                  </br>
                  다음은 타로 리더에게 내담자의 상황을 구체적으로 설명하는 방법에 대한 예시입니다.
                  </br>
                  </br>
                  예시:
                  </br>
                  </br>
                  당신이 최근에 갈등을 겪고 있는 직장 상황에 대해 조언을 구하고자 할 때 사용할 수 있는 구체적인 설명은 다음과 같습니다.</li></ul>
    <li  style="padding-left: 20px;">What (무엇): "최근 직장에서 프로젝트를 진행하는 과정에서 팀원들과 의사소통의 어려움을 겪고 있어요."</li>
    <li  style="padding-left: 20px;">Why (왜): "이 프로젝트는 내 커리어에 있어 중요한 기회이며, 진행 상황이 스트레스를 많이 주고 있습니다."</li>
    <li  style="padding-left: 20px;">When (언제): "문제는 한 달 전 프로젝트가 시작되었을 때부터 발생했으며, 다음 달 말에 중간 발표가 있어요."</li>
    <li  style="padding-left: 20px;">Where (어디서): "우리 팀은 회사 내부의 한 부서에서 함께 일하고 있고, 대부분의 논의는 회의실에서 이뤄집니다."</li>
    <li  style="padding-left: 20px;">Who (누구와): "저를 포함한 팀의 다섯 명의 멤버가 있으며, 팀장님과의 의사결정 과정에서 주로 문제가 생깁니다."</li>
    <li  style="padding-left: 20px;">How (어떻게): "저는 몇 번의 팀 미팅을 주선해봤지만, 여전히 의견 충돌이 발생하고, 이로 인해 프로젝트 진행에 차질이 생기고 있어요."</li>
  </ul>
  <br /><ul><li>이러한 구체적인 답변을 통해 타로 리더는 당신의 상황을 더 정확히 파악하고, 깊이 있는 조언과 통찰을 제공하는 데 필요한 정보를 갖출 수 있습니다.</li></ul>
  </br>
  <ul><li>3. 질문</li></ul>
  <br /><li>타로 카드에서 정확도를 높이는 질문 방식은 주관적이며 개인적인 경험에 따라 달라질 수 있지만, 일반적으로 명확하고, 집중된, 열린 마음의 질문을 하는 것이 유익합니다. 다음은 효과적인 타로 카드 질문을 위한 몇 가지 팁입니다:</li>

    <li  style="padding-left: 20px;">구체적인 질문하기: 질문이 너무 모호하면 해석이 어려울 수 있습니다. 구체적인 상황이나 느낌에 대해 질문하면 타로카드 해석이 명확해질 수 있습니다.</li>
    <li  style="padding-left: 20px;">열린 질문 사용: "예" 혹은 "아니오"로 답할 수 있는 질문 대신, 탐색적인 답변을 이끌어낼 수 있는 개방형 질문을 사용합니다.</li>
    <li  style="padding-left: 20px;">본인 중심의 질문: 타인의 생각이나 행동에 대한 질문보다는 본인의 감정, 반응, 선택에 집중하여 질문합니다.</li>
    <li  style="padding-left: 20px;">성장과 인식에 초점 맞추기: 타로는 성찰과 개인적 성장을 촉진하는데 특히 유용합니다. 어떻게 하면 성장할 수 있는지에 초점을 맞춰 질문합시다.</li>
    <li  style="padding-left: 20px;">긍정적이고 자기 주도적인 질문:  부정적인 질문보다는 (예: "승진이 안 된다면 어떡하지?") 긍정적이고 실천적인 관점에서 자신에게 더 좋은 결과를 이끌어낼 수 있는 방향으로 질문합시다.</li>
`,
    },
    {
      title: "타로 카드에게 어떤 질문을 하면 명확한 해결책을 찾을 수 있을까요?",
      content: `
        </br>
        <ul><li>타로 카드에 효과적으로 질문하는 방법에 좋은 예시를 몇 가지 들어보겠습니다.</li></ul></br>
        <ul><li>1.타로 카드에 자기 성찰을 위해 질문하기:</ul>
            <li  style="padding-left: 20px;">"인간관계에 있어서 항상 같은 패턴으로 갈등이 생기는데 내가 노력할 수 있는 방법이 있을까?"</li>
            <li  style="padding-left: 20px;">"나의 삶에서 지금 워라밸을 찾는 데 어떻게 하면 좋을까?"</li>
            <li  style="padding-left: 20px;">"지금 내 삶에서 변화가 필요한 분야는 어디이며, 어떻게 접근하는 것이 좋을까?"</li>
        <ul><li>2. 타로 카드에 관계에 대한 질문하기:</ul>
            <li  style="padding-left: 20px;">"연인관계를 강화하기 위해 어떤 방향으로 나아가야 할까?"</li>
            <li  style="padding-left: 20px;">"새로운 인간관계를 구축할 때 내가 염두에 둬야 할 핵심 가치는 무엇인가?"</li>
            <li  style="padding-left: 20px;">"대인 관계에서 겪는 도전을 극복하기 위해 내가 배워야 할 교훈은 무엇인가?"</li>
        <ul><li>3. 진로와 직업에 대한 타로 카드 질문:</ul>
            <li  style="padding-left: 20px;">"자기 발전과 커리어에서 다음 단계로 나아가는 데 도움이 되는 조언은?"</li>
            <li  style="padding-left: 20px;">"현재 직업적으로 부딪힌 장애를 어떻게 극복할 수 있을까?"</li>
            <li  style="padding-left: 20px;">"내 직업적 선택에서 가장 중점을 둬야 할 요소는 무엇인가?"</li>
       <ul><li>4. 개인적인 결정이나 선택에 대해 타로 카드에 질문하기:</ul>
            <li  style="padding-left: 20px;">"이 선택이 내 삶에 어떤 의미를 갖는지 알고 싶어."</li>
            <li  style="padding-left: 20px;">"향후 중대한 결정을 내리기 전에 인식해야 할 내면의 신호는 무엇인가?"</li>
            <li  style="padding-left: 20px;">"이번 결정에 직면하여, 내 목표와 가치를 가장 잘 표현하는 길은 무엇일까?"</li>
     <ul><li>기억하실 점은 타로 카드는 미래를 예측하는 것이 아니라 현재 상황에 대한 통찰력과 선택의 가능성을 제시하는 것이므로, 정확한 미래를 가리키는 '정확도'라는 개념이 항상 적용되지 않을 수 있다는 것입니다. 대신, 주어진 해석을 바탕으로 자신의 통찰력을 키우는 데 타로를 활용하는 것이 중요합니다.</li></ul>
      `,
    },
  ];

  const menuData = ["자주 묻는 질문", "이용약관", "개인정보처리방침"];

  return (
    <div className="support-main-container">
      <NavBar pageName="support" />
      <img src={Ball} className="ball-in-support" alt="ball" />
      <div className="support-greeting-container">
        <h1 className="support-h1">{t("support-h1")}</h1>
        <h2 className="support-greeting">{t("support-greeting")}</h2>
        <img src={Cube} className="cube-in-support" alt="cube" />
      </div>
      <div className="support-white-container">
        <div className="support-content-items">
          {currentMenu === 0
            ? data.map((item, index) => (
                <SupportContentItem
                  key={index}
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
              {/* <p dangerouslySetInnerHTML={{ __html: data[1].content }}></p> */}
            </div>
          ) : null}
          {currentMenu === 2 ? (
            <div className="support-third-content">
              <h3>개인정보처리방침</h3>
              <iframe
                src="https://plip.kr/pcc/6effcf5f-a061-42f4-be0d-e8b72575208c/privacy/1.html"
                title="개인정보처리방침"
                style={{
                  width: "100%",
                  height: "600px",
                  border: "none",
                }}
              />
            </div>
          ) : null}
        </div>
        <div className="support-menu-container">
          {menuData.map((item, index) => (
            <div className="support-menu-item-bar" key={index}>
              <div
                className={[
                  "menu-left-div",
                  index === currentMenu ? "menu-active" : "",
                ].join(" ")}
              ></div>
              <div
                className={[
                  "support-menu-item",
                  index === currentMenu ? "menu-title-active" : "",
                ].join(" ")}
                key={index}
                onClick={() => setCurrentMenu(index)}
              >
                {item}
              </div>
            </div>
          ))}
        </div>
      </div>
      <img src={Spiral} className="spiral-in-support" alt="spiral" />
      <GlobalFooter setLangurage={setLangurage} langurage={langurage} />
    </div>
  );
}
