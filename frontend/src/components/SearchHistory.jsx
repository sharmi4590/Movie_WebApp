import React, { useState, useEffect } from 'react';

function SearchHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    setHistory(searchHistory);
  }, []);
  const handleClearHistory = () => {
    localStorage.removeItem('searchHistory');
    setHistory([]);
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Search History</h1>
      
      {history.length > 0 ? (
        <ul>
          {history.map((movie, index) => (
            <li key={index} className="mb-4">
              <div className="flex items-center">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-16 h-auto mr-4 rounded-lg"
                />
                <div>
                  <h2 className="text-xl font-bold">{movie.title}</h2>
                  <p className="text-sm text-gray-600">{movie.release_date}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No search history available.</p>
      )}

      <button
        className="mt-4 bg-red-500 text-white p-2 rounded-lg"
        onClick={handleClearHistory}
      >
        Clear History
      </button>
    </div>
  );
}

export default SearchHistory;
