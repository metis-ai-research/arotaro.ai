import MainButton from "./MainButton";
import apple from "../resources/apple.png";
import google from "../resources/google-play.png";

export default function ButtonRow(props) {
  return (
    <div className="button-row">
      <MainButton type={props.type}>
        <img src={apple} alt="apple-store" className="button-icon" />
        App store
      </MainButton>
      <MainButton type={props.type}>
        <img src={google} alt="google-play" className="button-icon" />
        Google play
      </MainButton>
    </div>
  );
}
