import "./Review.scss";
import star from "../../resources/star.png";
import emptyStar from "../../resources/emptyStar.png";

export default function Review(props) {
  let lastStar;
  switch (props.number) {
    case "5.0":
      lastStar = <img src={star} alt="star" />;
      break;
    case "4.0":
      lastStar = <img src={emptyStar} alt="star" />;
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
