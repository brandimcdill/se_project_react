import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "../Sidebar/Sidebar.css";

function Sidebar({ handleEditProfileClick, handleSignOut }) {
  const currentUser = useContext(CurrentUserContext);

  const firstLetter = currentUser?.name
    ? currentUser.name.charAt(0).toUpperCase()
    : "";

  return (
    <div className="sidebar">
      {currentUser?.avatar ? (
        <img
          className="sidebar__avatar"
          src={currentUser.avatar}
          alt={currentUser.name}
        />
      ) : (
        <div className="sidebar__avatar-placeholder">{firstLetter}</div>
      )}
      <p className="sidebar__username">{currentUser?.name}</p>

      <div className="sidebar__actions">
        <button
          type="button"
          className="sidebar__edit-btn"
          onClick={handleEditProfileClick}
        >
          Edit profile
        </button>
        <button
          type="button"
          className="sidebar__logout-btn"
          onClick={handleSignOut}
        >
          Sign out
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
