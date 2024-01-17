import "./ReviewSection.scss";
import Review from "./Review";

export default function ReviewSection() {
  return (
    <div className="review-section">
      <div className="review-section-container">
        <h2 className="review-section-title">타로 상담 후기</h2>
        <div className="reviews-container">
          <Review
            review='"예약 없이 언제든지 타로 상당을 즐길 수 있다는 점이 정말 편리했어요. 언제든 내 마음을 확인하고 싶을 때 사용하니까요!"'
            name="fr********n"
            number="4.8"
          />
          <Review
            review='"AI 타로 리딩을 통해 남들에게는 말 못하는 이야기를 솔직하게 털어놓을 수 있어서 마음이 편안해졌어요..."'
            name="al*******0"
            number="4.9"
          />
          <Review
            review='"아로타로 앱을 사용해보니 정말로 재미있었어요! 리딩이 얼마나 맞을지 기대되서 계속 이용 했어요"'
            name="bl******9"
            number="4.6"
          />
          <Review
            review='"다른 타로 전화 상담과 달리 내가 직접 카드를 뽑아서 나만의 해결책을 찾을 수 있어서 정말 유용했어요. 개인 맞춤형 조언이 매우 도움이 되었습니다."'
            name="jj****g"
            number="4.7"
          />
        </div>
      </div>
    </div>
  );
}
