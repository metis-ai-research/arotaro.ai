import "./Review.scss";
import star from "../../resources/star.png";
import moreStar from "../../resources/more-than-half.png";
import halfStar from "../../resources/half-star.png";

export default function Review(props) {
  let lastStar;
  switch (props.number) {
    case "4.6":
      lastStar = <img src={halfStar} alt="star" />;
      break;
    case "4.7":
    case "4.8":
      lastStar = <img src={moreStar} alt="star" />;
      break;
    case "4.9":
      lastStar = <img src={star} alt="star" />;
      break;
    default:
      break;
  }
  return (
    <div className="review-container">
      <h4 className="review">{props.review}</h4>
      <div className="star-section">
        <span className="review-name">
          <b>ID:</b>
          {props.name}
        </span>
        <div className="star-box">
          <span className="review-number">{props.number}</span>
          <img src={star} alt="star" />
          <img src={star} alt="star" />
          <img src={star} alt="star" />
          <img src={star} alt="star" />
          {lastStar}
        </div>
      </div>
    </div>
  );
}
