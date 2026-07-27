import ModalWithForm from "../ModalWithForm/ModalWithForm";


export default function RegisterModal ({ onClose, isOpen, onSubmit, orButtonText }) {
    return (
        <ModalWithForm
        title="Sign Up"
        buttonText={"Sign Up"}
        onClose={onClose}
        isOpen={isOpen}
        onSubmit={handleSubmit}
        orButtonText={
            <button type="button" className="modal__redirect-button" onClick={handleLoginClick}>
                or Sign Up
            </button>
      }
    >
            <label htmlFor="email" className="modal__label"> 
                Email 
                <input 
                type="email" 
                name="email" 
                id="email" 
                className="modal__input" 
                placeholder="Email" 
                required 
                /> 
            </label>
            <label htmlFor="password" className="modal__label"> 
                Password
                <input 
                type="password" 
                name="password" 
                id="password" 
                className="modal__input" 
                placeholder="Password" 
                minlength="8"
                required 
                /> 
            </label>
             
             
        </ModalWithForm>
    )

}