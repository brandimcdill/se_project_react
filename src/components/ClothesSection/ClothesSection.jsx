import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

import "../ClothesSection/ClothesSection.css";
import ItemCard from "../../components/ItemCard/ItemCard";

function ClothesSection({ onClick, clothingItems, handleAddClick }) {
  const currentUser = useContext(CurrentUserContext);

  const userItems = clothingItems.filter(
    (item) => item.owner === currentUser?._id,
  );

  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p className="clothes-section__title">Your items</p>
        <button className="clothes-section__btn" onClick={handleAddClick}>
          + Add New
        </button>
      </div>
      <ul className="clothes-section__items">
        {userItems.map((item) => {
          return <ItemCard key={item._id} item={item} onClick={onClick} />;
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
