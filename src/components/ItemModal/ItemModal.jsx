import "./ItemModal.css";

function ItemModal({ activeModal, closeActiveModal, card, handleOutsideClick }) {
    return(
        <div className={`modal ${activeModal === "preview" ? "modal_opened" : ""}`} onClick={handleOutsideClick}>
            <div className="modal__content modal__content_type_image" onClick={(e) => e.stopPropagation()}>
            <button onClick={closeActiveModal} type="button" className="modal__close modal__close_type_preview"></button>
            <img src={card.link} alt={card.name} className="modal__image" />
            <div className="modal__footer">
                <h2 className="modal__caption">{card.name}</h2>
                <p className="modal__weather">Weather: {card.weather}</p>
            </div>
            </div>
        </div>
    )
}

export default ItemModal;