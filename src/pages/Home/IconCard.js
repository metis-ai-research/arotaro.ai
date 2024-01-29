import "./IconCard.scss";

export default function IconCard(props) {
  return (
    <div className="icon-card-container">
      <div className="icon-box">
        <img
          src={props.icon}
          alt="icon"
          className={["icon", props.className].join(" ")}
        />
      </div>
      <h3 className="card-title">{props.title}</h3>
      <p className="card-content">{props.content}</p>
    </div>
  );
}
