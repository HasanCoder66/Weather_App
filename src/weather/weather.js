import React, { useEffect, useState } from 'react'
import css from './css/style.css'
import Media from './css/media.css'
const WeatherApp = () => {
    const [city, setCity] = useState(null)
    const [search, setSearch] = useState("karachi")

    useEffect(() => {

        const getWeatherData = async () => {

            const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=40ed58a2765c4a602efac457943bedcc&units=metric`)
            const data = await res.json()
            setCity(data.main)
            console.log(data.main)
        }

        getWeatherData()
    }, [search])



    return (
        <>
            <h1 className='title'>
                WeatherApp
            </h1>
            <div className='box'>
                <div className='inputData'>
                    <input
                        type='search'
                        value={search}
                        className='inputField'
                        onChange={(event) => {
                            setSearch(event.target.value)
                        }} />
                </div>

                {
                    !city ? (
                        <p className='error'>
                            No Data Found
                        </p>
                    ) : (
                        <div className='info'>
                            <h1 className='location'>
                                <i className="fa-solid fa-street-view fa-2xl"></i> {search}
                            </h1>
                            <h2 className='temperature'>
                                {city.temp}°C
                            </h2>

                            <h3 className='temperature_max'>
                                Min  {city.temp_min}°C | Max  {city.temp_max}°C
                            </h3>


                        </div>
                    )
                }





            </div>
        </>
    )
}

export default WeatherApp