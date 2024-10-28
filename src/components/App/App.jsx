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
import { getItems, postItems, deleteItem } from '../../utils/api';

function App() {
  const [weatherData, setWeatherData] = useState({ type: "", temp: { F: 999 }, city: "" });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState('F');
  const [clothingItems, setClothingItems] = useState([]);
  
  const username = "Brandon Rogers";
  const avatar = true;

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

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("modal_opened")) {
      closeActiveModal();
    }
  }

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "C" ? "F" : "C");
  }

  const onAddItem = (values) => {
    postItems(values.name, values.link, values.weather)
    .then((newItem) => {
      setClothingItems((prevItems) => [newItem, ...prevItems]);
      closeActiveModal();
    })
    .catch((error) => console.error("Error adding item:", error))
  };

  const handleDeleteItem = (id) => {
    deleteItem(id)
      .then(() => {
        setClothingItems((prevItems) => prevItems.filter((item) => item._id !== id));
        closeActiveModal();
      })
      .catch((error) => console.error("Error deleting item:", error));
  };

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
 
  useEffect(() => {
    getWeather(coordinates, APIkey)
    .then((data) => {
      const filteredData = filterWeatherData(data);
      setWeatherData(filteredData);
    })
    .catch(console.error);
  }, [])

  useEffect(() => {
    getItems()
    .then((data) => {
      setClothingItems(data);
    }). catch(console.error);
  }, [])

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider value={{currentTemperatureUnit, handleToggleSwitchChange}}>
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} avatar={avatar} username={username} />
          <Routes>
            <Route path='/' element={<Main weatherData={weatherData} handleCardClick={handleCardClick} clothingItems={clothingItems}/>}/>
            <Route path='/profile' element={<Profile handleCardClick={handleCardClick} clothingItems={clothingItems}  avatar={avatar} username={username} handleAddClick={handleAddClick}/>}/>
          </Routes>
          <Footer />
        </div>
        {activeModal === "add-garment" && <AddItemModal activeModal={activeModal} closeActiveModal={closeActiveModal} handleOutsideClick={handleOutsideClick} onAddItem={onAddItem}/>}
        {activeModal === "preview" && (
          <ItemModal activeModal={activeModal} card={selectedCard} closeActiveModal={closeActiveModal} handleOutsideClick={handleOutsideClick} onDeleteItem={() => handleDeleteItem(selectedCard._id)}/>
        )}
      </CurrentTemperatureUnitContext.Provider>
    </div>
  )
}

export default App;