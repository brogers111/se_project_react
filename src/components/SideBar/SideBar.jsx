import "./SideBar.css";
import avatarDefault from "../../assets/avatar.svg"

function SideBar({ avatar, username }){
    return (
        <div className="sidebar">
            {avatar ? (<img src={avatarDefault} alt="user avatar" className="sidebar__avatar" />) : (<span className="sidebar__avatar sidebar__avatar_none">{username?.toUpperCase().charAt(0)|| ""}</span>)}
            <p className="sidebar__username">{username}</p>
        </div>
    )
}

export default SideBar;