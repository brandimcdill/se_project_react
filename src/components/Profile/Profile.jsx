import "../Profile/Profile.css";
import Sidebar from "../Sidebar/Sidebar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({ onClick, clothingItems, handleAddClick, handleEditProfileClick, handleSignOut, isLoggedIn, onCardLike }) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <Sidebar handleEditProfileClick={handleEditProfileClick} handleSignOut={handleSignOut} />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          onClick={onClick}
          clothingItems={clothingItems}
          handleAddClick={handleAddClick}
          isLoggedIn={isLoggedIn}
          onCardLike={onCardLike}
        />
      </section>
    </div>
  );
}

export default Profile;
