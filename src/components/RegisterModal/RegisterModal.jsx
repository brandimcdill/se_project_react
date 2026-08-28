import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

export default function RegisterModal({
  onClose,
  isOpen,
  onSubmit,
  handleLoginClick,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setPassword("");
      setName("");
      setAvatar("");
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(name, avatar, email, password);
  };

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Sign Up"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      orButtonText={
        <button
          type="button"
          className="modal__redirect-button"
          onClick={handleLoginClick}
        >
          or Log In
        </button>
      }
    >
      <label htmlFor="register-email" className="modal__label">
        Email
        <input
          type="email"
          name="email"
          id="register-email"
          className="modal__input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label htmlFor="register-password" className="modal__label">
        Password
        <input
          type="password"
          name="password"
          id="register-password"
          className="modal__input"
          placeholder="Password"
          minLength="8"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <label htmlFor="register-name" className="modal__label">
        Name
        <input
          type="text"
          name="name"
          id="register-name"
          className="modal__input"
          placeholder="Name"
          minLength="2"
          maxLength="30"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label htmlFor="register-avatar" className="modal__label">
        Avatar URL
        <input
          type="url"
          name="avatar"
          id="register-avatar"
          className="modal__input"
          placeholder="Avatar URL"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          required
        />
      </label>
    </ModalWithForm>
  );
}
