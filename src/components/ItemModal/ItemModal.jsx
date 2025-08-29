import "./ItemModal.css";
function ItemModal({ activeModal, onClose, card, onDelete }) {
  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={onClose}
          type="button"
          className="modal__close_preview"
        ></button>
        <img className="modal__image" src={card.imageUrl} alt={card.name} />
        <footer className="modal__footer">
          <div className="modal__footer_subsection">
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>
          <button
            className="delete-modal__open"
            onClick={onDelete}
            type="button"
          >
            {" "}
            Delete Item
          </button>
        </footer>
      </div>
    </div>
  );
}

export default ItemModal;
