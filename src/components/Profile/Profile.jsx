import "../Profile/Profile.css";
import Sidebar from "../Sidebar/Sidebar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({ onClick, clothingItems, handleAddClick, handleEditProfileClick, handleSignOut }) {
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
        />
      </section>
    </div>
  );
}

export default Profile;
