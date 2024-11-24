import axios from 'axios';
import React, { useEffect, useState } from 'react';

const App = () => {
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");  
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false); // To handle loading state
  const [error, setError] = useState(null); // To handle error state
  const ApiKey = 'f398df580ea3f9b9f6d215a2a13e481d'; 

  const inputuser = (e) => {
    setInput(e.target.value);  
  };

  const searchcity = () => {
    setSearch(input);
  };

  const weather = async () => {
    setLoading(true); // Set loading to true before the API call
    setError(null); // Reset error state before making the new request
    await axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${ApiKey}`)
      .then((response) => {
        setWeatherData(response.data);
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.log(error);
        setLoading(false); // Set loading to false if there is an error
        setError('Failed to fetch weather data. Please try again.'); // Display error message
      });
  };

  useEffect(() => {
    if (search) {
      weather();
    }
  }, [search]);

  return (
    <div className="flex w-full h-screen bg-black p-5">
      <div className="w-1/2 h-screen bg-black-900 p-4 flex flex-col items-center justify-between ">
        <div>
          <h1 className="text-center underline italic font-semibold text-5xl text-slate-600 mt-[8vh] ">
            Real time weather app
          </h1>
        </div>
        <input 
          onChange={inputuser} 
          value={input}
          className="p-4 m-4 border rounded text-black bg-zinc-100 w-full"
          placeholder="Search"
          aria-label="Search"
        />
        <button 
          onClick={searchcity} 
          className="p-4 mb-28 w-full border rounded  text-white bg-blue-500 hover:bg-blue-600"
        >
          Search Results
        </button>
      </div>
      
      <div className="relative w-1/2 h-screen bg-black-900 p-4 overflow-hidden mx-[8px]">
        {loading ? (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-zinc-300 p-8 text-black mt-5 w-[80vh] h-[80vh] flex justify-center items-center">
            <p>Loading...</p> {/* Show loading text or spinner */}
          </div>
        ) : error ? (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-zinc-300 p-8 text-black mt-5 w-[80vh] h-[80vh] flex justify-center items-center">
            <p>{error}</p> {/* Show error message */}
          </div>
        ) : weatherData ? (
          <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-zinc-300 p-8 text-black mt-5 w-[80vh] h-[80vh]'>
            <h2 className="text-center text-2xl font-semibold">Weather in <b>{weatherData.name}</b></h2>
            <p className="text-center mt-4">Temperature: {Math.round(weatherData.main.temp - 273.15)}°C</p>
            <p className="text-center mt-4">Weather: {weatherData.weather[0].description}</p>
            <p className="text-center mt-4">Humidity: {weatherData.main.humidity}</p>
            <p className="text-center mt-4">Longitude: {weatherData.coord.lon}</p>

          </div>
        ) : (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-zinc-300 p-8 text-black mt-5 w-[80vh] h-[80vh] flex justify-center items-center">
            <p>Search to see results</p> {/* Message when no data is available */}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
