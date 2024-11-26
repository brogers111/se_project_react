import { useContext } from "react";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import avatarDefault from "../../assets/avatar.svg"
import "./SideBar.css";

function SideBar({ handleModalOpen, handleLogout }){
    const { currentUser, isLoggedIn } = useContext(CurrentUserContext);

    return (
        <div className="sidebar">
            <div className="sidebar__profile-info">
                {currentUser.avatar ? (
                    <img src={currentUser.avatar} alt="user avatar" className="sidebar__avatar" />
                ) : (
                    <span className="sidebar__avatar sidebar__avatar_none">
                        {currentUser.name?.charAt(0).toUpperCase() || avatarDefault}
                    </span>
                )}
                <p className="sidebar__username">{currentUser.name}</p>
            </div>
            {isLoggedIn ? (
                <>
                    <div className="sidebar__profile-buttons">
                        <button onClick={() => handleModalOpen("edit-profile")} className="sidebar__update-profile-button">Change profile data</button>
                        <button onClick={handleLogout} className="sidebar__logout-button">Log out</button>
                    </div>
                </>
            ) : (
                <></>
            )}
        </div>
    )
}

export default SideBar;