// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Carousel from './components/Corousel'; 
import MovieList from './components/MovieList';
import SearchResults from './components/SearchResults';
import Login from './components/Login';
import Signup from './components/Signup';
import axios from 'axios';
import MovieDetail from './components/MovieDetail';
import Favorites from './components/Favourites';
import Pagenotfound from './components/404';
import SearchHistory from './components/SearchHistory';
import Footer from './components/Footer';
import { ThemeProvider } from './components/ThemeContext';
import ToggleButton from './components/ToggleButton';

const API_KEY = '5d4443b8010aed5d0d7a3a58ae31aae5';
const BASE_URL = 'https://api.themoviedb.org/3';

function App() {
  const [searchResults, setSearchResults] = useState(null);

  const handleSearch = async (query) => {
    if (!query) {
      setSearchResults(null);
      return;
    }
    
    try {
      const response = await axios.get(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`
      );
      setSearchResults(response.data.results);
    } catch (error) {
      console.error('Error searching for movies:', error);
    }
  };

  

  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <Navbar onSearch={handleSearch} />
          <Routes>
            <Route
              path="/"
              element={
                searchResults === null ? (
                  <>
                    <Carousel />
                    <div className="p-4">
                    <div id="popular-movies">
                        <MovieList
                          title="Popular Movies"
                          fetchUrl={`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`}
                        />
                        </div>
                      <MovieList
                        title="Popular Series"
                        fetchUrl={`${BASE_URL}/tv/popular?api_key=${API_KEY}&language=en-US&page=1`}
                      />
                      <MovieList
                        title="Top Rated Movies"
                        fetchUrl={`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`}
                      />
                      <MovieList
                        title="Top Rated Series"
                        fetchUrl={`${BASE_URL}/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1`}
                      />
                    </div>
                  </>
                ) : searchResults.length > 0 ? (
                  <SearchResults movies={searchResults} />
                ) : (
                  <div className="text-center text-black text-xl mt-10">No results found</div>
                )
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/movie/:movieId" element={<MovieDetail />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/search-history" element={<SearchHistory />} />
            <Route path="/popular-movies" element={<div id="popular-movies"></div>} />
            <Route path="*" element={<Pagenotfound />} />
          </Routes>
          <Footer />
          <ToggleButton />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
