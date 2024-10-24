import "./ModalWithForm.css";

function ModalWithForm({ children, buttonText, title, isOpen, closeActiveModal, handleOutsideClick }) {
    return(
        <div className={`modal ${isOpen ? "modal_opened" : ""}`} onClick={handleOutsideClick}>
            <div className="modal__content" onClick={(e) => e.stopPropagation()}>
                <h2 className="modal__title">{title}</h2>
                <button onClick={closeActiveModal} type="button" className="modal__close"></button>
                <form className="modal__form">
                    {children}
                    <button type="submit" className="modal__submit">{buttonText}</button>
                </form>
            </div>
        </div>
    )
}

export default ModalWithForm; 