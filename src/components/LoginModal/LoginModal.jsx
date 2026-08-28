import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";


export default function LoginModal ({ onClose, isOpen, onSubmit, handleRegisterClick }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (isOpen) {
            setEmail("");
            setPassword("");
        }
    }, [isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(email, password);
    };

    return (
        <ModalWithForm
        title="Log In"
        buttonText="Log In"
        onClose={onClose}
        isOpen={isOpen}
        onSubmit={handleSubmit}
        orButtonText={
            <button type="button" className="modal__redirect-button" onClick={handleRegisterClick}>
                or Sign Up
            </button>
      }
    >
            <label htmlFor="login-email" className="modal__label"> 
                Email 
                <input 
                type="email" 
                name="email" 
                id="login-email" 
                className="modal__input" 
                placeholder="Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
                /> 
            </label>
            <label htmlFor="login-password" className="modal__label"> 
                Password
                <input 
                type="password" 
                name="password" 
                id="login-password" 
                className="modal__input" 
                placeholder="Password" 
                minLength="8"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
                /> 
            </label>
        </ModalWithForm>
    );
}