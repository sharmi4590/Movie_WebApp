import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Link } from 'react-router-dom';

function MovieList({ title, fetchUrl }) {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=5d4443b8010aed5d0d7a3a58ae31aae5');
        setGenres(response.data.genres);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const genreFilter = selectedGenre ? `&with_genres=${selectedGenre}` : '';
        const response = await axios.get(`${fetchUrl}${genreFilter}`);
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, [fetchUrl, selectedGenre]);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="mb-4">
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>
      <div className="relative">
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-0 h-full bg-gray-800 text-white hover:bg-gray-700 p-2 rounded-r-md z-10 flex items-center justify-center"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        <div
          ref={scrollRef}
          className="overflow-x-scroll whitespace-nowrap scrollbar-hide"
        >
          {movies.map((movie) => (
            <Link
              key={movie.id}
              to={`/movie/${movie.id}`}
              className="relative inline-block w-64 mr-4 bg-white rounded-lg shadow-md"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title || movie.name}
                className="w-full h-auto rounded-t-lg"
              />
              <div className="absolute bottom-0 left-0 p-2 bg-gradient-to-t from-black via-transparent to-transparent w-full">
                <div className="flex items-center">
                  <div className="w-12 h-12 mr-2">
                    <CircularProgressbar
                      value={movie.vote_average * 10}
                      text={`${movie.vote_average * 10}%`}
                      styles={buildStyles({
                        textSize: '24px',
                        pathColor: '#21d07a',
                        textColor: '#fff',
                        trailColor: '#204529',
                        backgroundColor: '#081c22',
                      })}
                    />
                  </div>
                  <div className="text-white ml-2">
                    <p className="text-sm">{movie.release_date?.split('-')[0]}</p>
                    <p className="text-lg font-bold">{movie.title || movie.name}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <button
          onClick={scrollRight}
          className="absolute right-0 top-0 h-full bg-gray-800 text-white hover:bg-gray-700 p-2 rounded-l-md z-10 flex items-center justify-center"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default MovieList;