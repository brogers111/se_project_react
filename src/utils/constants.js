export const weatherOptions = [
  {
    day: true,
    condition: "clear",
    url: new URL("../assets/day/day-clear.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "cloudy",
    url: new URL("../assets/day/day-cloudy.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "fog",
    url: new URL("../assets/day/day-fog.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "rain",
    url: new URL("../assets/day/day-rain.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "snow",
    url: new URL("../assets/day/day-snow.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "storm",
    url: new URL("../assets/day/day-storm.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "clear",
    url: new URL("../assets/night/night-clear.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "cloudy",
    url: new URL("../assets/night/night-cloudy.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "fog",
    url: new URL("../assets/night/night-fog.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "rain",
    url: new URL("../assets/night/night-rain.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "snow",
    url: new URL("../assets/night/night-snow.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "storm",
    url: new URL("../assets/night/night-storm.png", import.meta.url).href,
  },
];

export const defaultWeatherOptions = {
  day: {
    condition: "",
    url: new URL("../assets/day/default.png", import.meta.url).href,
  },
  night: {
    condition: "",
    url: new URL("../assets/night/default.png", import.meta.url).href,
  },
};

export const APIkey = "14c3d3b6fa3dd10231f9997fc2f734b7";

export const coordinates = {
  latitude: 44.16697625816435,
  longitude: -93.99719342712606,
};

export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.wtwr.h0stname.net"
    : "http://localhost:3001";
