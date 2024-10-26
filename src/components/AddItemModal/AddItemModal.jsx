import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";

function AddItemModal({ activeModal, closeActiveModal, handleOutsideClick, onAddItem }){
    const [name, setName] = useState("");
    const [link, setLink] = useState("");
    const [weather, setWeather] = useState("");

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const handleLinkChange = (e) => {
        setLink(e.target.value);
    }

    const handleWeatherTypeChange = (e) => {
        setWeather(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddItem({name, weather, link})
    }

    useEffect(() => {
        if(activeModal){
            setName("");
            setLink("");
            setWeather("");
        }
    }, [activeModal]);

    return(
        <ModalWithForm title="New garment" buttonText="Add garment" activeModal={activeModal} closeActiveModal={closeActiveModal} handleOutsideClick={handleOutsideClick} onSubmit={handleSubmit}>
        <label htmlFor="name" className="modal__label">
            Name
            <input type="text" className="modal__input" id="name" placeholder="Name" value={name} onChange={handleNameChange}/>
        </label>
        <label htmlFor="imageUrl" className="modal__label">
            Image
            <input type="url" className="modal__input" id="imageUrl" placeholder="Image URL" value={link} onChange={handleLinkChange}/>
        </label>
        <fieldset className="modal__radio-buttons">
            <legend className="modal__legend">Select the weather type:</legend>
            <label htmlFor="hot" className="modal__label modal__label_type_radio">
                <input type="radio" className="modal__radio-input" id="hot" name="weather" value="hot" onChange={handleWeatherTypeChange}/>
                Hot
            </label>
            <label htmlFor="warm" className="modal__label modal__label_type_radio">
                <input type="radio" className="modal__radio-input" id="warm" name="weather" value="warm" onChange={handleWeatherTypeChange}/>
                Warm
            </label>
            <label htmlFor="cold" className="modal__label modal__label_type_radio">
                <input type="radio" className="modal__radio-input" id="cold" name="weather" value="cold" onChange={handleWeatherTypeChange}/>
                Cold
            </label>
        </fieldset>
      </ModalWithForm>
    )
}

export default AddItemModal;