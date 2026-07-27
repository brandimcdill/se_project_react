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
                or Log In
            </button>
      }>
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
             <label htmlFor="name" className="modal__label"> 
                Name
                <input 
                type="text" 
                name="name" 
                id="name" 
                className="modal__input" 
                placeholder="Name" 
                minLength="2"
                maxLength="30"
                required 
                /> 
            </label>
            <label htmlFor="url" className="modal__label"> 
                Avatar URL
                <input 
                type="url" 
                name="url" 
                id="url" 
                className="modal__input" 
                placeholder="Avatar URL" 
                required 
                /> 
            </label>
             
        </ModalWithForm>
    )

}