import { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../hooks/useFormAndValidation";
import "./AddItemModal.css";

function AddItemModal({ activeModal, closeActiveModal, handleOutsideClick, onAddItem, isLoading }) {
    const {values, handleChange, errors, isValid, resetForm} = useFormAndValidation()

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isValid) {
            onAddItem({ name: values.name, weather: values.weather, link: values.link });
        }
    };

    useEffect(() => {
        if (activeModal) {
            resetForm();
        }
    }, [activeModal, resetForm]);

    return (
        <ModalWithForm
            title="New garment"
            buttonText={isLoading ? "Saving..." : "Add garment"}
            activeModal={activeModal}
            closeActiveModal={closeActiveModal}
            handleOutsideClick={handleOutsideClick}
            onSubmit={handleSubmit}
            isFormValid={isValid}
        >
            <label htmlFor="name" className="modal__label">
                Name
                <input
                    type="text"
                    name="name"
                    className="modal__input"
                    id="name"
                    placeholder="Name"
                    value={values.name || ""}
                    onChange={handleChange}
                    required
                />
                {errors.name && <span className="modal__error">{errors.name}</span>}
            </label>
            <label htmlFor="link" className="modal__label">
                Image
                <input
                    type="url"
                    name="link"
                    className="modal__input"
                    id="link"
                    placeholder="Image URL"
                    value={values.link || ""}
                    onChange={handleChange}
                    required
                />
                {errors.link && <span className="modal__error">{errors.link}</span>}
            </label>
            <fieldset className="modal__radio-buttons">
                <legend className="modal__legend">Select the weather type:</legend>
                <label htmlFor="hot" className="modal__label modal__label_type_radio">
                    <input
                        type="radio"
                        className="modal__radio-input"
                        id="hot"
                        name="weather"
                        value="hot"
                        checked={values.weather === "hot"}
                        onChange={handleChange}
                    />
                    Hot
                </label>
                <label htmlFor="warm" className="modal__label modal__label_type_radio">
                    <input
                        type="radio"
                        className="modal__radio-input"
                        id="warm"
                        name="weather"
                        value="warm"
                        checked={values.weather === "warm"}
                        onChange={handleChange}
                    />
                    Warm
                </label>
                <label htmlFor="cold" className="modal__label modal__label_type_radio">
                    <input
                        type="radio"
                        className="modal__radio-input"
                        id="cold"
                        name="weather"
                        value="cold"
                        checked={values.weather === "cold"}
                        onChange={handleChange}
                    />
                    Cold
                </label>
            </fieldset>
        </ModalWithForm>
    );
}

export default AddItemModal;
