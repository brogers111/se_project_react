import { useEffect, useState, useCallback } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';

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
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { getItems, postItems, deleteItem, updateProfile, addCardLike ,removeCardLike } from '../../utils/api';
import * as auth from "../../utils/auth";
import RegisterModal from '../RegisterModal/RegisterModal';
import LoginModal from '../LoginModal/LoginModal';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import EditProfileModal from '../EditProfileModal/EditProfileModal';

function App() {
  const [weatherData, setWeatherData] = useState({ type: "", temp: { F: 999 }, city: "" });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState('F');
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({name: "", avatar: ""})
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggedInLoading, setIsLoggedInLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  function getToken(){
    return localStorage.getItem("jwt");
  }

  const handleRegistration = (values) => {
    if (values.password) {
      auth
        .register(values.email, values.password, values.name, values.avatar)
        .then(() => {
          handleLogin({ email: values.email, password: values.password})
          navigate("/");
          closeActiveModal();
        })
        .catch(console.error);
    }
  };

  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      return;
    }

    auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          auth.checkToken(data.token)
          .then((userData) => {
            setCurrentUser(userData);
            setIsLoggedIn(true);
          })
          const redirectPath = location.state?.from?.pathname || "/profile";
          navigate(redirectPath);
          closeActiveModal();
        }
      })
      .catch(console.error);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
  }

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  }

  const handleAddClick = () => setActiveModal("add-garment");

  const handleModalOpen = (modalType) => {
    setActiveModal(modalType);
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

  function handleSubmit(request){
    setIsLoading(true);
    request()
    .then(closeActiveModal)
    .catch((error) => console.error("Error:", error))
    .finally(() => setIsLoading(false));
  }

  const onAddItem = (values) => {
    const token = getToken();
    const makeRequest = () => {
      return postItems(values.name, values.link, values.weather, token)
      .then((newItem) => {
        setClothingItems((prevItems) => [newItem, ...prevItems]);
      });
    };
    handleSubmit(makeRequest);
  };

  const onUpdateProfile = (values) => {
    const token = getToken();
    const makeRequest = () => {
      return updateProfile(values.name, values.avatar, token)
      .then((newProfile) => {
        setCurrentUser((prevUser) => ({ ...prevUser, ...newProfile}));
      });
    };
    handleSubmit(makeRequest);
  }

  const handleDeleteItem = (id) => {
    const token = getToken();
    const makeRequest = () => {
      return deleteItem(id, token)
      .then(() => {
        setClothingItems((prevItems) => prevItems.filter((item) => item._id !== id));
      });
    };
    handleSubmit(makeRequest);
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = getToken();
    const apiCall = isLiked ? removeCardLike : addCardLike;

    apiCall(id, token)
    .then((updatedCard) => {
      setClothingItems((cards) => 
        cards.map((item) => (item._id === id ? updatedCard : item))
      );
    })
    .catch((err) => console.error("Like/Dislike Error:", err));
  }

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

  useEffect(() => {
    const token = getToken();

    if(token){
      auth.checkToken(token)
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.error("Token validation error:", err);
        setIsLoggedIn(false);
    })
    .finally(() => setIsLoggedInLoading(false));
    } else {
      setIsLoggedInLoading(false);
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={{currentUser, isLoggedIn, isLoggedInLoading}}>
      <CurrentTemperatureUnitContext.Provider value={{currentTemperatureUnit, handleToggleSwitchChange}}>
        <div className="page__wrapper">
          <div className="page">
            <div className="page__content">
              <Header handleAddClick={handleAddClick} weatherData={weatherData} handleModalOpen={handleModalOpen}/>
              <Routes>
                <Route
                  path='/'
                  element={
                    <Main weatherData={weatherData} handleCardClick={handleCardClick} clothingItems={clothingItems} onCardLike={handleCardLike}/>
                  }
                />
                
                <Route
                  path='/profile'
                  element={
                    <ProtectedRoute>
                      <Profile handleCardClick={handleCardClick} clothingItems={clothingItems} handleAddClick={handleAddClick} handleModalOpen={handleModalOpen} handleLogout={handleLogout}/>
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="*"
                  element={
                    isLoggedIn ? (
                      <Navigate to="/profile" replace />
                    ) : (
                      <Navigate to="/" replace />
                    )
                  }
                />
              </Routes>
            </div>
            <Footer />
          </div>
        </div>
        {activeModal === "add-garment" && <AddItemModal activeModal={activeModal} closeActiveModal={closeActiveModal} handleOutsideClick={handleOutsideClick} onAddItem={onAddItem} isLoading={isLoading}/>}
        {activeModal === "preview" && <ItemModal activeModal={activeModal} card={selectedCard} closeActiveModal={closeActiveModal} handleOutsideClick={handleOutsideClick} onDeleteItem={() => handleDeleteItem(selectedCard._id)} isLoading={isLoading}/>}
        {activeModal === "signup" && <RegisterModal activeModal={activeModal} closeActiveModal={closeActiveModal} handleOutsideClick={handleOutsideClick} isLoading={isLoading} handleRegistration={handleRegistration}/>}
        {activeModal === "login" && <LoginModal activeModal={activeModal} closeActiveModal={closeActiveModal} handleOutsideClick={handleOutsideClick} isLoading={isLoading} handleLogin={handleLogin}/>}
        {activeModal === "edit-profile" && <EditProfileModal activeModal={activeModal} closeActiveModal={closeActiveModal} handleOutsideClick={handleOutsideClick} isLoading={isLoading} onUpdateProfile={onUpdateProfile}/>}
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  )
}

export default App;