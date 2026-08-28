import { useContext } from "react";
import CurrentUserContext  from "../../contexts/CurrentUserContext";
import "./ItemCard.css";

function ItemCard({ item, onClick, onCardLike, isLoggedIn }) {
  const currentUser = useContext(CurrentUserContext);

  const handleCardClick = () => {
    onClick(item);
  };

  const isLiked = item.likes?.some((id) => id === currentUser?._id);

  const itemLikeButtonClassName = `card__like-btn ${isLiked ? "card__like-btn_active" : ""}`;

  const handleLike = () => {
    onCardLike({ id: item._id, isLiked});
  };

  let nameValue;
  if (typeof item.name === "object" && item.name !== null) {
    nameValue = item.name.name;
  } else {
    nameValue = item.name;
  }

  return (
    <li className="card">
      <div className="card__header">
      <h2 className="card__name">{nameValue}</h2>
      {isLoggedIn && (
        <button 
        type="button"
        className={itemLikeButtonClassName}
        onClick={handleLike}
        aria-label="Like item"
        />
      )}
      </div>
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
