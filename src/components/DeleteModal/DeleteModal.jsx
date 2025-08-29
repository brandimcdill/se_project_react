import { useState } from "react";
import "../DeleteModal/DeleteModal.css";

function DeleteModal({ activeModal, onConfirm, onCancel, onClose, card }) {
  const handleDelete = () => {
    onConfirm(card._id);
  };
  return (
    <div className={`modal ${activeModal === "delete" && "modal_opened"}`}>
      <div className="delete-modal__content">
        <button
          type="button"
          onClick={onClose}
          className="modal__close"
        ></button>
        <p className="delete-modal__title">
          Are you sure you want to delete this item?
        </p>
        <p className="delete-modal__title delete-modal__title_second">
          This action is irreversible.
        </p>
        <button
          onClick={handleDelete}
          type="button"
          className="delete-modal__btn delete-modal__btn_confirm"
        >
          Yes, delete item
        </button>
        <button
          onClick={onCancel}
          type="button"
          className="delete-modal__btn delete-modal__btn_cancel"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeleteModal;
