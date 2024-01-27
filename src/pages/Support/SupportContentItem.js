import "./SupportContentItem.scss";
import IconDropDown from "../../resources/drop-down-icon.png";

export default function SupportContent({ title, content, onClick, isOpen }) {
  return (
    <div className="support-content-item-container" onClick={onClick}>
      <div className="support-content-item-title">
        <h4>{title}</h4>
        <img
          src={IconDropDown}
          className={["drop-down-icon", isOpen ? "img-active" : ""].join(" ")}
        />
      </div>
      <div
        className={["support-content-box", isOpen ? "content-active" : ""].join(
          " ",
        )}
      >
        <p dangerouslySetInnerHTML={{ __html: content }}></p>
      </div>
      <div className="content-bottom-line"></div>
    </div>
  );
}
