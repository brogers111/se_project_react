import "./Header.css";
import logo from "../../assets/logo.svg";
import avatarDefault from "../../assets/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";

function Header({ handleAddClick, weatherData }){
    const currentDate = new Date().toLocaleString('default', { month: 'long', day: 'numeric' });

    const username = "Brandon Rogers";
    const avatar = "";

    return(
        <header className="header">
            <Link to="/">
                <img className="header__logo" src={logo} alt="logo" />
            </Link>
            <p className="header__date-and-location">{currentDate} - {weatherData.city}, {weatherData.country}</p>
            <div className="header__avatar-and-buttons">
                <ToggleSwitch />
                <button onClick={handleAddClick} type="button" className="header__add-clothes-btn">+ Add Clothes</button>
                <Link to="/profile" className="header__user-container">
                        <p className="header__username">{username}</p>
                        {avatar ? (<img src={avatarDefault} alt="user avatar" className="header__avatar" />) : (<span className="header__avatar header__avatar_none">{username?.toUpperCase().charAt(0)|| ""}</span>)}
                </Link>
            </div>
        </header>
    );
}

export default Header;