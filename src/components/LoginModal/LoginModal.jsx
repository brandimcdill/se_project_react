import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

export default function LoginModal({
  onClose,
  isOpen,
  onSubmit,
  handleRegisterClick,
}) {
 const { values, handleChange } = useForm({  email: "", password: ""}, isOpen);


  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values.email, values.password);
  };

  return (
    <ModalWithForm
      title="Log In"
      buttonText="Log In"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      orButtonText={
        <button
          type="button"
          className="modal__redirect-button"
          onClick={handleRegisterClick}
        >
          or Sign Up
        </button>
      }
    >
      <label htmlFor="login-email" className="modal__label">
        Email*
        <input
          type="email"
          name="email"
          id="login-email"
          className="modal__input"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="login-password" className="modal__label">
        Password*
        <input
          type="password"
          name="password"
          id="login-password"
          className="modal__input"
          placeholder="Password"
          minLength="8"
          value={values.password}
          onChange={handleChange}
          required
        />
      </label>
    </ModalWithForm>
  );
}
