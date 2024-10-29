import MainButton from "./MainButton";
import apple from "../resources/apple.png";
import google from "../resources/google-play.png";

export default function ButtonRow(props) {
  const handleGoogleClick = () => {
    window.open(
      "https://play.google.com/store/apps/details?id=com.arotaro.android",
      "_blank",
    );
  };

  const handleAppleClick = () => {
    window.open(
      "https://apps.apple.com/ca/app/arotaro/id6475332338?platform=iphone",
      "_blank",
    );
  };

  return (
    <div className="button-row">
      <MainButton type={props.type} onClick={handleAppleClick}>
        <img src={apple} alt="apple-store" className="button-icon" />
        App Store
      </MainButton>
      <MainButton type={props.type} onClick={handleGoogleClick}>
        <img src={google} alt="google-play" className="button-icon" />
        Google Play
      </MainButton>
    </div>
  );
}
