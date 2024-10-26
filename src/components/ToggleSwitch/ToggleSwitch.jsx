import { useState } from "react";
import "./ToggleSwitch.css";

function ToggleSwitch(){
    const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

    const handleChange = () => {
        if (currentTemperatureUnit === "C") {
            setCurrentTemperatureUnit("F");
        } else if (currentTemperatureUnit === "F"){
            setCurrentTemperatureUnit("C");
        }
    }

    return(
        <label className="switch">
            <input type="checkbox" className="switch__box" onChange={handleChange} />
            <span className={`switch__slider ${currentTemperatureUnit === "F" ? "switch__slider-F" : "switch__slider-C"}`}></span>
            <p className={`switch__temp-F ${currentTemperatureUnit === "F" && "switch__active"}`}>F</p>
            <p className={`switch__temp-C ${currentTemperatureUnit === "C" && "switch__active"}`}>C</p>
        </label>
    );
}

export default ToggleSwitch;