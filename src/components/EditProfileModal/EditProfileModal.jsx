import { useContext, useEffect } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

function EditProfileModal({ isOpen, onClose, onSubmit, isLoading }) {
  const currentUser = useContext(CurrentUserContext);

  const { values, handleChange, setValues } = useForm(
    { name: "" , avatar: "" },
    isOpen
  );

  useEffect(() => {
    if (isOpen && currentUser) {
      setValues({
        name: currentUser.name || "",
        avatar: currentUser.avatar || "",
      });
    }
  }, [currentUser, isOpen, setValues]);



  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name: values.name, avatar: values.avatar });
  };

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <button onClick={onClose} type="button" className="modal__close" />
        <h2 className="modal__title">Change profile data</h2>
        <form onSubmit={handleSubmit} className="modal__form">
          <label className="modal__label">
            Name *
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="modal__input"
              value={values.name}
              onChange={handleChange}
              required
            />
          </label>
          <label className="modal__label">
            Avatar URL *
            <input
              type="url"
              name="avatar"
              placeholder="Avatar URL"
              className="modal__input"
              value={values.avatar}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit" className="modal_submit-btn">
            {isLoading ? "Saving..." : "Save changes"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfileModal;
