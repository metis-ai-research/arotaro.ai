import { useState, useEffect } from "react";
import "./Support.scss";
import NavBar from "../../components/NavBar";
import GlobalFooter from "../../components/GlobalFooter";
import SupportContentItem from "./SupportContentItem";
import { useTranslation } from "react-i18next";
import Ball from "../../resources/shapes/support-ball.png";
import Cube from "../../resources/shapes/support-cube.png";
import Spiral from "../../resources/shapes/support-spiral.png";

export default function Support({ tab }) {
  const { t, i18n } = useTranslation();
  const [langurage, setLangurage] = useState("한국어");
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [currentMenu, setCurrentMenu] = useState(0);

  useEffect(() => {
    if (tab === "faq") {
      setCurrentMenu(0);
    } else if (tab === "disclaimer") {
      setCurrentMenu(1);
    } else if (tab === "terms") {
      setCurrentMenu(2);
    } else if (tab === "policy") {
      setCurrentMenu(3);
    }
  }, [tab]);

  const handleItemClick = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const data = [
    {
      title: {
        ko: "타로 카드는 어떻게 사용되나요?",
        en: "How are tarot cards used?",
      },
      content: {
        ko: `
        타로 카드는 다양한 방식으로 사용될 수 있습니다. 여기에는 몇 가지 일반적인 사용 방법이 포함되어 있습니다:
        <br />
        <ul><li>1. 예측 및 점술:</ul>
        <li style="padding-left: 20px;">타로는 미래에 대한 예측이나 현재 상황에 대한 통찰력을 얻는 도구로 사용됩니다. 각 카드는 특정 의미와 상징을 가지며, 그것들의 조합은 특정 질문에 대한 답을 제공할 수 있습니다.</li>
        </li>
        <ul><li>2. 자기 탐구 및 심리적 성장:</ul>
        <li style="padding-left: 20px;">타로는 자기 탐구와 심리적인 성장에 활용될 수 있습니다. 각 카드는 특정 테마나 심리적 측면을 나타내므로, 자기 자신을 더 잘 이해하고 개선하고자 하는 데 도움이 될 수 있습니다.</li>
        </li>
        <ul><li>3. 의사소통과 상담:</ul>
        <li style="padding-left: 20px;">타로는 대화의 도구로 활용될 수 있습니다. 카드는 상담사와 커뮤니케이션 중에 내담자의 관점을 이해하고 의사소통을 돕기 위해 사용될 수 있습니다.</li>
        </li>
        <ul><li>4. 명상과 집중:</ul>
        <li style="padding-left: 20px;">타로 카드를 사용하여 명상이나 집중력을 향상시킬 수 있습니다. 카드를 통해 얻은 이미지나 상징은 정신적인 평화와 내면을 이해하는데 사용될 수 있습니다.</li>
        </li>
        `,
        en: `
        Tarot cards can be used in various ways. Here are some common methods:
        <br />
        <ul><li>1.Prediction and Divination:</ul>
        <li style="padding-left: 20px;">Tarot is used as a tool for predicting the future or gaining insights into current situations. Each card has specific meanings and symbols, and their combinations can provide answers to specific questions.</li>
        </li>
        <ul><li>2. Self-Exploration and Psychological Growth:</ul>
        <li style="padding-left: 20px;">Tarot can be utilized for self-exploration and psychological growth. Each card represents specific themes or psychological aspects, aiding in better understanding and improvement of oneself.</li>
        </li>
        <ul><li>3. Communication and Counseling:</ul>
        <li style="padding-left: 20px;">Tarot can serve as a tool for communication. The cards can be used during interactions between a counselor and a client to understand the client's perspective and facilitate communication.</li>
        </li>
        <ul><li>4. Meditation and Focus:</ul>
        <li style="padding-left: 20px;">Using tarot cards can enhance meditation and concentration. The images and symbols from the cards can be employed to achieve mental peace and understanding of the inner self.</li>
        </li>
        `,
      },
    },
    {
      title: {
        ko: "어떤 주제로 질문을 하는게 좋을까요?",
        en: "What would be a good topic to ask questions about? ",
      },
      content: {
        ko: `타로 카드는 자신의 내면을 탐색하고 선택의 교차로에서 맞는 방향으로 가고자 할 때 다양한 질문을 던질 수 있는 도구입니다. 여기 몇 가지 예시를 들어보겠습니다:
        <br /><ul><li>1. 요새 제 일상이 하루하루 비슷하고 지루해요. 이직을 고려해 볼 만한 적절한 시점이 언제일까요?</li>
        <li>2. 오랫동안 교제해 온 그 사람과 관계를 한 단계 더 발전시키고 싶어요. 그/그녀의 마음 속에는 어떤 생각이 있을까요?</li>
        <li>3. 내 커리어의 성장에 있어서 내가 해야할 다음 단계는 무엇일까?</li>
        <li>4. 다음달 중요한 면접이 있는데 내가 여기서 뭘 더 준비하면 좋을까?</li>
        <li>5. 나의 장애물이나 어려움을 극복하기 위해 어떠한 조언을 얻을 수 있을까?</li>
        <li>6. 몇년째 연봉이 오르질않아. 어떻게 하면 연봉인상을 받을 수 있을까?</li>
        <li>7. 최근 마음에 드는 사람이 생겼어. 그/그녀에게 어떻게 다가가는게 좋을까?</li>
        </ul>
        타로는 이와 같이 개인의 깊은 내면적 질문부터 구체적인 일상의 결정까지, 광범위한 주제에 대해 성찰하고 자문을 구할 수 있는 도구입니다. 그러나 당신의 질문은 당신의 현재 필요와 상황에 맞춰 개인화될 수 있으므로, 진지하게 고민하고 있는걸 마이타로 리더와 함께 이야기보세요.`,
        en: `Tarot cards are a tool that can be used to explore one's inner self and ask various questions when seeking the right direction at the crossroads of choice. Here are a few examples:
        <br /><ul><li>1. Lately, my daily life has been repetitive and dull. When would be an appropriate time to consider a career change?</li>
        <li>2. I've been in a long-term relationship and want to take it to the next level. What thoughts might be in his/her heart?</li>
        <li>3. In terms of the growth of my career, what is the next step I should take?</li>
        <li>4. I have an important interview next month. What more can I prepare for here?</li>
        <li>5. What advice can I get to overcome obstacles or difficulties in my life?</li>
        <li>6. My salary has not increased for several years. How can I receive a salary raise?</li>
        <li>7. Recently, I've developed feelings for someone. How should I approach him/her?</li>
        </ul>
        Tarot can be a tool for reflection and seeking advice on a wide range of topics, from deep personal questions to specific everyday decisions. However, your questions can be personalized according to your current needs and situations, so discuss what you are seriously contemplating with Arotaro readers.`,
      },
    },
    {
      title: {
        ko: "효과적인 조언을 들으려면 어떠한 방식으로 상황 설명을 해야할까요?",
        en: "How to effectively describe a situation for insightful advice using Tarot cards?",
      },
      content: {
        ko: `
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
        <li style="padding-left: 20px;">What (무엇): "최근 직장에서 프로젝트를 진행하는 과정에서 팀원들과 의사소통의 어려움을 겪고 있어요."</li>
        <li style="padding-left: 20px;">Why (왜): "이 프로젝트는 내 커리어에 있어 중요한 기회이며, 진행 상황이 스트레스를 많이 주고 있습니다."</li>
        <li style="padding-left: 20px;">When (언제): "문제는 한 달 전 프로젝트가 시작되었을 때부터 발생했으며, 다음 달 말에 중간 발표가 있어요."</li>
        <li style="padding-left: 20px;">Where (어디서): "우리 팀은 회사 내부의 한 부서에서 함께 일하고 있고, 대부분의 논의는 회의실에서 이뤄집니다."</li>
        <li style="padding-left: 20px;">Who (누구와): "저를 포함한 팀의 다섯 명의 멤버가 있으며, 팀장님과의 의사결정 과정에서 주로 문제가 생깁니다."</li>
        <li style="padding-left: 20px;">How (어떻게): "저는 몇 번의 팀 미팅을 주선해봤지만, 여전히 의견 충돌이 발생하고, 이로 인해 프로젝트 진행에 차질이 생기고 있어요."</li>
        </ul>
        <br /><ul><li>이러한 구체적인 답변을 통해 타로 리더는 당신의 상황을 더 정확히 파악하고, 깊이 있는 조언과 통찰을 제공하는 데 필요한 정보를 갖출 수 있습니다.</li></ul>
        </br>
        <ul><li>3. 질문</li></ul>
        <br /><li>타로 카드에서 정확도를 높이는 질문 방식은 주관적이며 개인적인 경험에 따라 달라질 수 있지만, 일반적으로 명확하고, 집중된, 열린 마음의 질문을 하는 것이 유익합니다. 다음은 효과적인 타로 카드 질문을 위한 몇 가지 팁입니다:</li>
        <li style="padding-left: 20px;">구체적인 질문하기: 질문이 너무 모호하면 해석이 어려울 수 있습니다. 구체적인 상황이나 느낌에 대해 질문하면 타로카드 해석이 명확해질 수 있습니다.</li>
        <li style="padding-left: 20px;">열린 질문 사용: "예" 혹은 "아니오"로 답할 수 있는 질문 대신, 탐색적인 답변을 이끌어낼 수 있는 개방형 질문을 사용합니다.</li>
        <li style="padding-left: 20px;">본인 중심의 질문: 타인의 생각이나 행동에 대한 질문보다는 본인의 감정, 반응, 선택에 집중하여 질문합니다.</li>
        <li style="padding-left: 20px;">성장과 인식에 초점 맞추기: 타로는 성찰과 개인적 성장을 촉진하는데 특히 유용합니다. 어떻게 하면 성장할 수 있는지에 초점을 맞춰 질문합시다.</li>
        <li style="padding-left: 20px;">긍정적이고 자기 주도적인 질문:  부정적인 질문보다는 (예: "승진이 안 된다면 어떡하지?") 긍정적이고 실천적인 관점에서 자신에게 더 좋은 결과를 이끌어낼 수 있는 방향으로 질문합시다.</li>`,
        en: `
        <br /><ul><li>1. Describing the situation</li></ul>
        <ul><li>2. During a Tarot reading, to convey the client's situation clearly, it is beneficial to use key question elements such as Who, When, Where, What, How, and Why. Applying these principles helps the Tarot reader better understand the client's situation.
        </br>
        </br>
        Here is an example of how to describe your situation to a Tarot reader, specifically addressing a recent conflict at work:
        </br>
        </br>
        <li style="padding-left: 20px;">What: "I am currently facing communication difficulties with my team while working on a project."</li>
        <li style="padding-left: 20px;">Why: "This project is a crucial opportunity for my career, and the progress is causing a lot of stress."</li>
        <li style="padding-left: 20px;">When: "The issue arose about a month ago when the project started, and there is a mid-term presentation scheduled for the end of next month."</li>
        <li style="padding-left: 20px;">Where: "Our team works within a department in the company, and most discussions take place in the meeting room."</li>
        <li style="padding-left: 20px;">Who: "There are five members in our team, and conflicts mainly arise during decision-making with our team leader."</li>
        <li style="padding-left: 20px;">How: "Despite facilitating several team meetings, conflicts persist, causing disruptions in the project."</li>
        </ul>
        <br /><ul><li>By providing specific answers like this, a Tarot reader can more accurately grasp your situation and gather the necessary information to offer profound advice and insights.</li></ul>
        </br>
        <ul><li>3. Asking Questions:</li></ul>
        <br /><li>The effectiveness of Tarot card readings depends on subjective and personal experiences, but generally, asking clear, focused, and open-minded questions is beneficial. Here are some tips for asking effective Tarot card questions:</li>
        <li style="padding-left: 20px;">Be Specific: If questions are too vague, interpretations may be challenging. Asking about specific situations or feelings can lead to clearer Tarot card interpretations.</li>
        <li style="padding-left: 20px;">Use Open Questions: Instead of questions with a simple "yes" or "no" answer, use open-ended questions that encourage exploratory responses.</li>
        <li style="padding-left: 20px;">Self-Centered Questions: Focus on your emotions, reactions, and choices rather than seeking answers about others' thoughts or actions.</li>
        <li style="padding-left: 20px;">Emphasize Growth and Insight: Tarot is particularly useful for reflection and personal growth. Focus on how you can grow from the situation in your questions.</li>
        <li style="padding-left: 20px;">Positivity and Self-Initiative: Instead of negative questions (e.g., "What if I don't get the promotion?"), frame questions positively and from a proactive perspective to lead yourself toward better outcomes.</li>`,
      },
    },
    {
      title: {
        ko: "타로 카드에게 어떤 질문을 하면 명확한 해결책을 찾을 수 있을까요?",
        en: "In what ways can I frame questions for tarot cards to ensure a clear and definite outcome?",
      },
      content: {
        ko: `
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
        en: `
      </br>
      <ul><li>Here are some examples of effectively phrasing questions for Tarot card readings:</li></ul></br>
      <ul><li>1.Self-reflection questions with Tarot cards:</ul>
          <li  style="padding-left: 20px;">"I often find myself in repetitive conflict patterns in my relationships. Is there a way for me to break these patterns and make an effort to improve my connections with others?"</li>
          <li  style="padding-left: 20px;">"In my current life, how can I find a better work-life balance and enhance my overall well-being?"</li>
          <li  style="padding-left: 20px;">"What area of my life requires change right now, and how can I approach it for positive transformation?"</li>
      <ul><li>2. Relationship-related questions with Tarot cards:</ul>
          <li  style="padding-left: 20px;">"To strengthen my romantic relationship, what direction should I focus on?"</li>
          <li  style="padding-left: 20px;">"When building new relationships, what core values should I keep in mind?"</li>
          <li  style="padding-left: 20px;">"What lessons do I need to learn to overcome challenges in my interpersonal relationships?"</li>
      <ul><li>3. Career and vocational questions with Tarot cards:</ul>
          <li  style="padding-left: 20px;">"Do you have any advice from the cards that can help me progress to the next level in my personal and professional development?"</li>
          <li  style="padding-left: 20px;">"How can I overcome the obstacles I'm currently facing in my career?"</li>
          <li  style="padding-left: 20px;">"What should be the key focus in my career decisions at the moment?"</li>
     <ul><li>4. Personal decision or choice questions with Tarot cards:</ul>
          <li  style="padding-left: 20px;">""I want to understand the significance of this choice in my life."</li>
          <li  style="padding-left: 20px;">"Before making a significant decision, what inner signals should I be aware of?"</li>
          <li  style="padding-left: 20px;">"Facing this decision, what path best aligns with my goals and values?"</li>
   <ul><li>Remember, Tarot cards provide insights and possibilities rather than predicting the future with absolute accuracy. It's essential to use Tarot as a tool for self-reflection and gaining insight into your current situation.</li></ul>
    `,
      },
    },
  ];

  const disclaimer = [
    {
      en: `
      <body class="mceContentBody aui-theme-default wiki-content fullsize">
  <h3>Disclaimer </h3>
  <p><strong>For Entertainment Purposes Only</strong></p>
  <ul>
     <li>
        <p>All information provided through the service, contents posted on the website, and materials conveyed are solely for entertainment purposes. We advise not to take interpretations too literally and remind you that this service is provided solely for entertainment purposes. </p>
     </li>
  </ul>
  <p><strong>Not Professional Advice </strong></p>
  <ul>
     <li>
        <p>The information provided by the service is not intended to replace professional advice. It should not be used as professional advice for medical diagnosis, treatment, or care. It should not be used as professional advice or guidance for financial or investment matters, nor should it be used as legal advice. Do not hesitate or neglect to seek professional consultation due to information obtained from the website or service.</p>
     </li>
  </ul>
  <p>You are responsible for making decisions and leading your life. MyTarot does not take responsibility for any thoughts, feelings, or actions that arise from the results of tarot readings..</p>
  </br>
  <h3><strong>Refund Policy</strong></h3>
  <p>At MyTarot, we prioritize customer satisfaction and take pride in our products and services. However, please understand that refunds are not possible for dissatisfaction with the results, as MyTarot's products are digital and services are personalized.</p>
  <p>Refunds will not be provided under any circumstances for tarot readings or other services provided through the app. By purchasing MyTarot services, you are deemed to have agreed to this refund policy. We appreciate your understanding and cooperation.</p>
  <p></p>
  <hr>
  <p>References</p>
  <p><a href="https://online-tarot-reader.com/dislaimer/" data-card-appearance="inline">https://online-tarot-reader.com/dislaimer/</a> </p>
  <p><a href="https://www.trustedtarot.com/terms/#service" data-card-appearance="inline">https://www.trustedtarot.com/terms/#service</a> </p>
  <p>
  </p>
  <p>&nbsp;</p>
</body>
      `,
      kr: `
      <body class="mceContentBody aui-theme-default wiki-content fullsize">
  <p>&nbsp;</p>
  <h3>면책 조항</h3>
  <p><strong>단순히 엔터테인먼트용으로만 사용됩니다. </strong></p>
  <ul>
     <li>
        <p>서비스를 통해 제공되는 모든 정보, 웹사이트에 게시된 내용 및 전달하는 자료들은 오직 오락을 목적으로 합니다. 해석을 너무 문자 그대로 받아들이지 않으시길 권장드리며, 이 서비스는 오락 목적으로만 제공됩니다. </p>
     </li>
  </ul>
  <p><strong>전문가와의 상담이 아닙니다.</strong></p>
  <ul>
     <li>
        <p>서비스에서 제공되는 정보는 전문가의 조언을 대체하기 위한 것이 아닙니다. 의료 조언, 진단, 혹은 치료를 위한 전문적인 의견으로 사용해서는 안 됩니다. 금융이나 투자에 대한 전문적인 조언이나 지침으로 사용해서는 안 되며, 법적인 조언으로 활용해서도 안 됩니다. 웹사이트나 서비스에서 얻은 정보로 인해 전문가의 상담을 받는 데 주저하거나 간과하지 마시길 바랍니다.</p>
     </li>
  </ul>
  <p>자신의 삶을 결정하고 이끌어갈 수 있는 것은 본인 자신입니다. 마이타로는 타로 리딩의 결과로 발생하는 여러분의 생각, 감정 또는 행동에 대해 책임을 지지 않습니다.</p>
  </br>
  <h3><strong>환불정책</strong></h3>
  <p>마이타로는 고객님의 만족을 최우선으로 여기며, 우리의 제품과 서비스에 자부심을 가지고 있습니다. 그러나 마이타로의 제품은 디지털 상품이며, 개인 맞춤형으로 제공되는 서비스이기에 결과에 대한 불만족으로 환불이 불가능함을 양해 부탁드립니다.</p>
  <p>어떠한 상황에서도 타로 리딩 또는 앱을 통해 제공된 기타 서비스에 대한 환불은 이루어지지 않습니다. 마이타로 서비스를 구매하실 때, 이 환불 정책에 동의하신 것으로 간주합니다. 고객 여러분의 이해와 협조에 감사드립니다.</p>
</body>
      `,
    },
  ];

  const menuData = [
    i18n.language === "ko" ? "자주 묻는 질문" : "FAQ",
    i18n.language === "ko"
      ? "면책 조항 및 환불정책"
      : "Disclaimer & Refund Policy",
    i18n.language === "ko" ? "이용약관" : "Terms of Service",
    i18n.language === "ko" ? "개인정보처리방침" : "Privacy Policy",
  ];

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
                  title={item.title[i18n.language]}
                  content={item.content[i18n.language]}
                />
              ))
            : null}
          {currentMenu === 1 ? (
            <div
              className="support-second-content"
              dangerouslySetInnerHTML={{
                __html:
                  i18n.language === "ko" ? disclaimer[0].kr : disclaimer[0].en,
              }}
            />
          ) : null}
          {currentMenu === 2 ? (
            <div className="support-second-content">
              <iframe
                src={
                  i18n.language === "ko"
                    ? "https://arotaro.ai/kr-terms-and-conditions.html"
                    : " https://arotaro.ai/en-terms-and-conditions.html "
                }
                title="이용약관"
                style={{
                  width: "100%",
                  height: "600px",
                  border: "none",
                }}
              />
            </div>
          ) : null}
          {currentMenu === 3 ? (
            <div className="support-second-content">
              <iframe
                src={
                  i18n.language === "ko"
                    ? "https://plip.kr/pcc/6effcf5f-a061-42f4-be0d-e8b72575208c/privacy/1.html"
                    : "https://arotaro.ai/privacy-policy.html"
                }
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
