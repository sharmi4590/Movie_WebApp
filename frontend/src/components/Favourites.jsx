import React, { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';

function Favorite() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
    setFavorites(favoriteMovies);
  }, []);

  
  const removeFavorite = (movieId) => {
    let favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
    favoriteMovies = favoriteMovies.filter(movie => movie.id !== movieId);
    localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
  };
  
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">My Favorite Movies</h1>
      <div className="flex flex-wrap">
        {favorites.length > 0 ? (
          favorites.map(movie => (
            <div key={movie.id} className="w-64 bg-white rounded-lg shadow-md m-2">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-auto rounded-t-lg"
              />
              <div className="p-2">
                <p className="text-lg font-bold">{movie.title}</p>
                <button
                  className="text-red-500 flex items-center mt-2"
                  onClick={() => removeFavorite(movie.id)}
                >
                  <FaTrash className="mr-2" /> Remove from Favorites
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No favorite movies added yet.</p>
        )}
      </div>
    </div>
  );
}

export default Favorite;
