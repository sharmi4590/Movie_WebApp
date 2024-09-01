import React from 'react';

function SearchResults({ movies }) {
  if (!movies || movies.length === 0) {
    return <div className="text-center text-white text-xl mt-10">No results found</div>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
      {movies.map((movie) => (
        <div key={movie.id} className="relative">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-auto rounded-lg shadow-lg"
          />
          <div className="absolute bottom-2 left-2 text-white">
            <div className="bg-black bg-opacity-50 p-2 rounded-md">
              <div className="text-lg font-bold">{movie.vote_average.toFixed(1)}/10</div>
              <div className="text-sm">{new Date(movie.release_date).getFullYear()}</div>
              <div className="text-md font-bold">{movie.title}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SearchResults;
