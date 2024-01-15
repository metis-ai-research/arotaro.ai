import "./css/MainButton.scss";

export default function MainButton(props) {
  return (
    <div className={["button-box", props.type].join(" ")}>{props.children}</div>
  );
}
