import React, { useEffect, useState } from "react";
import css from "./css/style.css";
import Media from "./css/media.css";

import CloudyImg from "./assets/tobias-stonjeck-e_ZxKz3_2Nc-unsplash.jpg";
import SunnyImg from "./assets/agustin-gunawan-7iwYPkGzO2o-unsplash.jpg";
import FogImg from "./assets/federico-bottos-obQacWYxB1I-unsplash.jpg";
import RainyImg from "./assets/surface-455124_1280.jpg";
import SnowImg from "./assets/wladislaw-sokolowskij-0vw4InAC-yM-unsplash.jpg";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [search, setSearch] = useState("karachi");
  const [weatherName, setWeatherName] = useState("");

  useEffect(() => {
    const getWeatherData = async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=40ed58a2765c4a602efac457943bedcc&units=metric`
        );
        const data = await res.json();
        console.log(data);
        setCity(data.main);
        setWeatherName(data.weather[0].main);
      } catch (error) {
        console.log(error);
      }
    };
    getWeatherData();
  }, [search]);

  const backgroundImgChanger = () => {
    if (
      weatherName == "Haze" ||
      weatherName == "Mist" ||
      weatherName == "Smoke" ||
      weatherName == "Dust" ||
      weatherName == "Fog" ||
      weatherName == "Sand" ||
      weatherName == "Ash" ||
      weatherName == "Squall" ||
      weatherName == "Tornado"
    ) {
      return `url(${FogImg})`;
    } else if (weatherName == "Rain" || weatherName == "Drizzle") {
      return `url(${RainyImg})`;
    } else if (weatherName == "Clouds") {
      return `url(${CloudyImg})`;
    } else if (weatherName == "Snow") {
      return `url(${SnowImg})`;
    } else if (weatherName == "Clear") {
      return `url(${SunnyImg})`;
    }
    // else if (weatherName == 'Thunderstorm') {
    //     return(
    //         `url(${CloudyImg})`
    //     )
    // }
  };

  return (
    <>
      <div
        className="mainContainer"
        style={{
          width: "100vw",
          height: "100vh",
          backgroundImage: backgroundImgChanger(),
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <h1 className="title">WeatherApp</h1>

        <div className="box">
          <div className="inputData">
            <input
              type="search"
              value={search}
              className="inputField"
              onChange={(event) => {
                setSearch(event.target.value);
              }}
            />
          </div>

          <div className="details">
            {city !== undefined ? (
              <div className="info">
                <h1 className="location">
                  <i className="fa-solid fa-street-view fa-2xl"></i> {search}
                </h1>
                <h2 className="temperature">{city.temp}°C</h2>

                <h3 className="temperature_max">
                  Min {city.temp_min}°C | Max {city.temp_max}°C
                </h3>
              </div>
            ) : (
              <p className="error">No Data Found</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default WeatherApp