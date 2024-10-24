import { useEffect, useState, useCallback } from 'react';

import './App.css';
import { coordinates, APIkey } from '../../utils/constants';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import ItemModal from '../ItemModal/ItemModal';
import { getWeather, filterWeatherData } from '../../utils/weatherApi';

function App() {
  const [weatherData, setWeatherData] = useState({ type: "", temp: { F: 999 }, city: "" });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  }

  const handleAddClick = () => {
    setActiveModal("add-garment");
  }

  const closeActiveModal = useCallback(() => {
    setActiveModal("");
  }, []);

  useEffect(() => {

    if (!activeModal) return;

    const handleEscape = (e) => {
      if (e.key === "Escape" && activeModal) {
        closeActiveModal();
      }
    };
    document.addEventListener("keydown", handleEscape);

    return() => {
      document.removeEventListener("keydown", handleEscape);
    }
  }, [activeModal, closeActiveModal]);

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("modal_opened")) {
      closeActiveModal();
    }
  }

  useEffect(() => {
    getWeather(coordinates, APIkey)
    .then((data) => {
      const filteredData = filterWeatherData(data);
      setWeatherData(filteredData);
    })
    .catch(console.error);
  }, [])

  return (
    <div className="page">
      <div className="page__content">
        <Header handleAddClick={handleAddClick} weatherData={weatherData} />
        <Main weatherData={weatherData} handleCardClick={handleCardClick}/>
        <Footer />
      </div>
      <ModalWithForm title="New garment" buttonText="Add garment" isOpen={activeModal === "add-garment"} closeActiveModal={closeActiveModal} handleOutsideClick={handleOutsideClick}>
        <label htmlFor="name" className="modal__label">
            Name
            <input type="text" className="modal__input" id="name" placeholder="Name"/>
        </label>
        <label htmlFor="imageUrl" className="modal__label">
            Image
            <input type="url" className="modal__input" id="imageUrl" placeholder="Image URL"/>
        </label>
        <fieldset className="modal__radio-buttons">
            <legend className="modal__legend">Select the weather type:</legend>
            <label htmlFor="hot" className="modal__label modal__label_type_radio">
                <input type="radio" className="modal__radio-input" id="hot" name="weather"/>
                Hot
            </label>
            <label htmlFor="warm" className="modal__label modal__label_type_radio">
                <input type="radio" className="modal__radio-input" id="warm" name="weather" />
                Warm
            </label>
            <label htmlFor="cold" className="modal__label modal__label_type_radio">
                <input type="radio" className="modal__radio-input" id="cold" name="weather" />
                Cold
            </label>
        </fieldset>
      </ModalWithForm>
      <ItemModal activeModal={activeModal} card={selectedCard} closeActiveModal={closeActiveModal} handleOutsideClick={handleOutsideClick}/>
    </div>
  )
}

export default App;