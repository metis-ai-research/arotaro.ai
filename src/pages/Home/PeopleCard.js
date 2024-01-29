import "./PeopleCard.scss";
export default function PeopleCard(props) {
  return (
    <div className="people-card">
      <img src={props.image} alt={props.name} />
      <h3>{props.name}</h3>
      <p>
        <b>{props.subtitle}</b> <br />
        {props.description}
      </p>
      <div className="tag-row">
        {props.tags.map((tag, index) => {
          return <span key={index}>{tag}</span>;
        })}
      </div>
    </div>
  );
}
