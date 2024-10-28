import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";

function AddItemModal({ activeModal, closeActiveModal, handleOutsideClick, onAddItem }) {
    const [name, setName] = useState("");
    const [link, setLink] = useState("");
    const [weather, setWeather] = useState("");
    const [isFormValid, setIsFormValid] = useState(false);
    const [linkError, setLinkError] = useState("");
    const [nameError, setNameError] = useState("");
    const [isNameFocused, setIsNameFocused] = useState(false);
    const [isLinkFocused, setIsLinkFocused] = useState(false);

    const handleNameChange = (e) => {
        setName(e.target.value);
        setNameError("");
    };

    const handleLinkChange = (e) => {
        setLink(e.target.value);
        setLinkError("");
    };

    const handleWeatherTypeChange = (e) => setWeather(e.target.value);

    useEffect(() => {
        setIsFormValid(name.trim() !== "" && link.trim() !== "" && weather !== "");
    }, [name, link, weather]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isFormValid) {
            onAddItem({ name, weather, link });
        }
    };

    useEffect(() => {
        if (name.length < 2 && isNameFocused) {
            setNameError("Please enter a name");
        }
        if (!link || !/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(link) && isLinkFocused) {
            setLinkError("Please enter a valid URL");
        }
    }, [name, link, isNameFocused, isLinkFocused]);

    useEffect(() => {
        if (activeModal) {
            setName("");
            setLink("");
            setWeather("");
            setNameError("");
            setLinkError("");
        }
    }, [activeModal]);

    return (
        <ModalWithForm
            title="New garment"
            buttonText="Add garment"
            activeModal={activeModal}
            closeActiveModal={closeActiveModal}
            handleOutsideClick={handleOutsideClick}
            onSubmit={handleSubmit}
            isFormValid={isFormValid}
        >
            <label htmlFor="name" className="modal__label">
                Name
                <input
                    type="text"
                    className="modal__input"
                    id="name"
                    placeholder="Name"
                    value={name}
                    onChange={handleNameChange}
                    onFocus={() => setIsNameFocused(true)}
                    onBlur={() => setIsNameFocused(false)}
                    required
                />
                {nameError && isNameFocused && <span className="modal__error">{nameError}</span>}
            </label>
            <label htmlFor="imageUrl" className="modal__label">
                Image
                <input
                    type="url"
                    className="modal__input"
                    id="imageUrl"
                    placeholder="Image URL"
                    value={link}
                    onChange={handleLinkChange}
                    onFocus={() => setIsLinkFocused(true)}
                    onBlur={() => setIsLinkFocused(false)}
                    required
                />
                {linkError && isLinkFocused && <span className="modal__error">{linkError}</span>}
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
                        onChange={handleWeatherTypeChange}
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
                        onChange={handleWeatherTypeChange}
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
                        onChange={handleWeatherTypeChange}
                    />
                    Cold
                </label>
            </fieldset>
        </ModalWithForm>
    );
}

export default AddItemModal;
