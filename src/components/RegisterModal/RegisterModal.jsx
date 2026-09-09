import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

export default function RegisterModal({
  onClose,
  isOpen,
  onSubmit,
  handleLoginClick,
}) {
const { values, handleChange } = useForm({  email: "", password: "", name: "", avatar: ""}, isOpen);

 

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values.name, values.avatar, values.email, values.password);
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
        Email*
        <input
          type="email"
          name="email"
          id="register-email"
          className="modal__input"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="register-password" className="modal__label">
        Password*
        <input
          type="password"
          name="password"
          id="register-password"
          className="modal__input"
          placeholder="Password"
          minLength="8"
          value={values.password}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="register-name" className="modal__label">
        Name*
        <input
          type="text"
          name="name"
          id="register-name"
          className="modal__input"
          placeholder="Name"
          minLength="2"
          maxLength="30"
          value={values.name}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="register-avatar" className="modal__label">
        Avatar URL*
        <input
          type="url"
          name="avatar"
          id="register-avatar"
          className="modal__input"
          placeholder="Avatar URL"
          value={values.avatar}
          onChange={handleChange}
          required
        />
      </label>
    </ModalWithForm>
  );
}
