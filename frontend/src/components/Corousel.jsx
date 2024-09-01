import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';

function Carousel() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/trending/movie/day?api_key=5d4443b8010aed5d0d7a3a58ae31aae5`
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching trending movies:', error);
      }
    };

    fetchTrendingMovies();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
    cssEase: 'linear',
  };

  const genreMapping = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentary',
    18: 'Drama',
    10751: 'Family',
    14: 'Fantasy',
    36: 'History',
    27: 'Horror',
    10402: 'Music',
    9648: 'Mystery',
    10749: 'Romance',
    878: 'Science Fiction',
    10770: 'TV Movie',
    53: 'Thriller',
    10752: 'War',
    37: 'Western',
  };

  const getGenres = (genreIds) => genreIds.map((id) => genreMapping[id]).join(', ');

  const handleWatchNow = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <Slider {...settings} className="carousel">
      {movies.map((movie) => (
        <div key={movie.id} className="relative h-screen">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white px-6 text-center">
            <h2 className="text-4xl font-bold mb-2">{movie.title}</h2>
            <div className="flex items-center justify-center mb-2">
              <span className="mr-4">
                Rating: {movie.vote_average.toFixed(1)}/10
              </span>
              {movie.genre_ids && (
                <span className="ml-4">
                  Genre: {getGenres(movie.genre_ids.slice(0, 3))}
                </span>
              )}
            </div>
            <p className="mb-6 max-w-3xl">{movie.overview}</p>
            <button
              onClick={() => handleWatchNow(movie.id)}
              className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full"
            >
              Watch Now
            </button>
          </div>
        </div>
      ))}
    </Slider>
  );
}

export default Carousel;