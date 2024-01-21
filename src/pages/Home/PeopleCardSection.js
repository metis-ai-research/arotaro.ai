import "./PeopleCardSection.scss";
import PeopleCard from "./PeopleCard";
import People1 from "../../resources/people1.png";
import People2 from "../../resources/people2.png";
import People3 from "../../resources/people3.png";
import People4 from "../../resources/people4.png";
import Platonic from "../../resources/shapes/Platonic_a2.png";

export default function PeopleCardSection() {
  return (
    <div className="home-second-secion">
      <div className="people-card-section">
        <h2 className="people-card-section-title">
          원하는 상담 스타일의 ai 타로 리더를 만나보세요!
        </h2>
        <div className="people-cards-row">
          <PeopleCard
            image={People1}
            name="신비"
            subtitle="상담 스타일"
            description="명확한 방향성을 제시하는 조언형"
            tags={["연애", "이별", "이직"]}
          />
          <PeopleCard
            image={People4}
            name="올리버"
            subtitle="상담 스타일"
            description="다정하게 이야기를 들어주는 공감형"
            tags={["금전", "직장", "연애"]}
          />
          <PeopleCard
            image={People3}
            name="루나"
            subtitle="상담 스타일"
            description="따뜻하고 친절하게 상담하는 위로형"
            tags={["반려동물", "연애", "재회"]}
          />
          <PeopleCard
            image={People2}
            name="로이"
            subtitle="상담 스타일"
            description="예리한 타로 상담을 제공하는 분석형"
            tags={["썸", "진로", "직장"]}
          />
        </div>
      </div>
      <img src={Platonic} className="platonic-in-people" alt="platonic" />
    </div>
  );
}
