import MainButton from "./MainButton";
import apple from "../resources/apple.png";
import google from "../resources/google-play.png";

export default function ButtonRow(props) {
  const handleClick = () => {
    window.open(
      "https://play.google.com/store/apps/details?id=com.arotaro.android",
      "_blank"
    );
  };
  return (
    <div className="button-row">
      <MainButton type={props.type}>
        <img src={apple} alt="apple-store" className="button-icon" />
        Coming soon
      </MainButton>
      <MainButton type={props.type} onClick={handleClick}>
        <img src={google} alt="google-play" className="button-icon" />
        Google play
      </MainButton>
    </div>
  );
}
