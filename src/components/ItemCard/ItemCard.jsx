import "./ItemCard.css";

function ItemCard({ item, onClick }) {
  const handleCardClick = () => {
    onClick(item);
  };

  let nameValue;
  if (typeof item.name === "object" && item.name !== null) {
    nameValue = item.name.name;
  } else {
    nameValue = item.name;
  }

  return (
    <li className="card">
      <h2 className="card__name">{nameValue}</h2>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={nameValue}
      />
    </li>
  );
}
export default ItemCard;
