import { useContext } from "react";
import { Link } from "react-router-dom";

import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import logo from "../../assets/logo.svg";
import avatarDefault from "../../assets/avatar.svg";
import "./Header.css";

function Header({ handleAddClick, weatherData, handleModalOpen }){
    const { currentUser, isLoggedIn } = useContext(CurrentUserContext)

    const currentDate = new Date().toLocaleString('default', { month: 'long', day: 'numeric' });

    return(
        <header className="header">
            <Link to="/">
                <img className="header__logo" src={logo} alt="logo" />
            </Link>
            <p className="header__date-and-location">
                {currentDate} - {weatherData.city}, {weatherData.country}
            </p>
            <div className="header__avatar-and-buttons">
                <ToggleSwitch />
                {isLoggedIn ? (
                    <>
                        <button onClick={handleAddClick} type="button" className="header__add-clothes-btn">
                            + Add Clothes
                        </button>
                        <Link to="/profile" className="header__user-container">
                            <p className="header__username">{currentUser.name}</p>
                            {currentUser.avatar ? (
                                <img src={currentUser.avatar} alt="user avatar" className="header__avatar" />
                            ) : (
                                <span className="header__avatar header__avatar_none">
                                    {currentUser.name?.charAt(0).toUpperCase() || avatarDefault}
                                </span>
                            )}
                        </Link>
                    </>
                ) : (
                    <>
                        <button onClick={() => handleModalOpen("signup")} className="header__signup-button">
                            Sign Up
                        </button>
                        <button onClick={() => handleModalOpen("login")} className="header__login-button">
                            Log In
                        </button>
                    </>
                )}
            </div>
        </header>
    );
}

export default Header;