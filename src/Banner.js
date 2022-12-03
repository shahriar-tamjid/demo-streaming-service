import React, { useEffect, useState } from 'react'
import './Banner.css'
import axios from './axios';
import requests from './requests';

function Banner() {

    // Store the fetched movie for banner in this "movie" vairbale
    const [movie, setMovie] = useState([]);

    // fetching the movie from the TMDB API via our "axios.js" and "requests.js" file
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchNetflixOriginals);
            setMovie(
                // Randomly choosing one movie from the list of fetched movies
                request.data.results[
                    Math.floor(Math.random() * request.data.results.length - 1)
                ]
            );
            return request;
        }

        fetchData();

    }, []);

    // Function to truncate large description
    function truncate(string, n) {
        return string?.length > n ? string.substr(0, n - 1) + '...': string;
    }
  return (
    <header className='banner' style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
    }}>
        <div className="banner__contents">
            <h1 className='banner__title'>
                {movie?.title || movie?.name || movie?.original_name}
            </h1>
            <div className="banner__buttons">
                <button className='banner__button'>Play</button>
                <button className='banner__button'>My List</button>
            </div>
            <h1 className="banner__description">
                {truncate(movie?.overview, 150)}
            </h1>
        </div>

        <div className="banner--fadeBottom" />

    </header>
  )
}

export default Banner