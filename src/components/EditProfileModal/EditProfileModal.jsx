import { useContext, useState, useEffect } from "react";
import  CurrentUserContext from "../../contexts/CurrentUserContext";

function EditProfileModal({ isOpen, onClose, onSubmit, isLoading}) {
    const currentUser = useContext(CurrentUserContext);

    const [name, setName] = useState("");
    const [avatar, setAvatar] = useState("");

    useEffect(() => {
        if (currentUser) {
            setName(currentUser.name || "");
            setAvatar(currentUser.avatar || "");
        }
    }, [currentUser, isOpen]);

    const handleNameChange = (e) => setName(e.target.value);
    const handleAvatarChange = (e) => setAvatar(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ name, avatar });
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
                        value={name}
                        onChange={handleNameChange}
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
                        value={avatar}
                        onChange={handleAvatarChange}
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