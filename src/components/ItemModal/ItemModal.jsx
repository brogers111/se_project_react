import "./ItemModal.css";

function ItemModal({ activeModal, closeActiveModal, card, handleOutsideClick, onDeleteItem, isLoading }) {
    return(
        <div className={`modal ${activeModal === "preview" ? "modal_opened" : ""}`} onClick={handleOutsideClick}>
            <div className="modal__content modal__content_type_image" onClick={(e) => e.stopPropagation()}>
                <button onClick={closeActiveModal} type="button" className="modal__close modal__close_type_preview"></button>
                <img src={card.imageUrl} alt={card.name} className="modal__image" />
                <div className="modal__footer">
                    <div className="modal__details">
                        <h2 className="modal__caption">{card.name}</h2>
                        <p className="modal__weather">Weather: {card.weather}</p>
                    </div>
                    <button onClick={onDeleteItem} className="modal__delete-item">
                        {isLoading ? "Deleting..." : "Delete item"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ItemModal;