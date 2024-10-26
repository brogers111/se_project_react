import { useEffect, useState, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import { coordinates, APIkey } from '../../utils/constants';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import AddItemModal from '../AddItemModal/AddItemModal';
import ItemModal from '../ItemModal/ItemModal';
import Profile from '../Profile/Profile';
import { getWeather, filterWeatherData } from '../../utils/weatherApi';
import {CurrentTemperatureUnitContext} from '../../contexts/CurrentTemperatureUnitContext';
import { defaultClothingItems } from "../../utils/constants";

function App() {
  const [weatherData, setWeatherData] = useState({ type: "", temp: { F: 999 }, city: "" });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState('F');
  const [newClothingItems, setNewClothingItems] = useState(defaultClothingItems);

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  }

  const onAddItem = (values) => {
    const newId = newClothingItems.length > 0 
      ? Math.max(...newClothingItems.map(item => item._id)) + 1 
      : 0;
      
    const newItem = { _id: newId, ...values };
    setNewClothingItems((prevItems) => [newItem, ...prevItems]);
    closeActiveModal();
};

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

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "C" ? "F" : "C");
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
      <CurrentTemperatureUnitContext.Provider value={{currentTemperatureUnit, handleToggleSwitchChange}}>
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Routes>
            <Route path='/' element={<Main weatherData={weatherData} handleCardClick={handleCardClick} newClothingItems={newClothingItems}/>}/>
            <Route path='/profile' element={<Profile handleCardClick={handleCardClick} newClothingItems={newClothingItems}/>}/>
          </Routes>
          <Footer />
        </div>
        {activeModal === "add-garment" && <AddItemModal activeModal={activeModal} closeActiveModal={closeActiveModal} handleOutsideClick={handleOutsideClick} onAddItem={onAddItem}/>}
        {activeModal === "preview" && (
          <ItemModal activeModal={activeModal} card={selectedCard} closeActiveModal={closeActiveModal} handleOutsideClick={handleOutsideClick}/>
        )}
      </CurrentTemperatureUnitContext.Provider>
    </div>
  )
}

export default App;