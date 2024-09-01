import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from './ThemeContext.js'; 

const Navbar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMovieDropdownOpen, setIsMovieDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem('user'));
    setUser(loggedUser);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      setIsDropdownOpen(false); 
    }
  }, [isMenuOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
    if (query.trim() === '') {
      navigate('/');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login'); 
  };
  
  return (
    <nav className={`flex flex-col md:flex-row justify-between items-center p-4 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} transition-colors duration-300`}>
      <div className="flex items-center justify-between  w-full md:w-auto">
        <Link to="/" className="text-lg font-bold hover:text-green-500 transition-colors duration-300">MovieDB</Link>
        <Link to="/" className="hover:text-green-500 transition-colors duration-300 ml-4 md:ml-2">Home</Link>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
      <div className={`flex-col md:flex-row md:flex md:space-x-4 w-full md:w-auto ${isMenuOpen ? 'flex' : 'hidden'} md:flex`}>
       {/* <div className="flex items-center space-x-4">
          <Link to="/" className="hover:text-green-500 transition-colors duration-300">Home</Link>
          {/* <div className="relative">
            <button
              onClick={() => setIsMovieDropdownOpen(!isMovieDropdownOpen)}
              className="hover:text-green-500 transition-colors duration-300"
            >
              Movies
            </button>
            {isMovieDropdownOpen && (
              <div className="absolute left-0 mt-2 bg-white text-gray-900 border border-gray-300 rounded-lg shadow-lg z-50">
                <Link to="/" className="block px-4 py-2 hover:bg-gray-100 transition-colors duration-300">Popular Movies</Link>
                <Link to="/" className="block px-4 py-2 hover:bg-gray-100 transition-colors duration-300">Popular Series</Link>
                <Link to="/" className="block px-4 py-2 hover:bg-gray-100 transition-colors duration-300">Top Rated Movies</Link>
                <Link to="/" className="block px-4 py-2 hover:bg-gray-100 transition-colors duration-300">Top Rated Movies</Link>
              </div>
            )}
          </div> 
        </div> */}
        <form onSubmit={handleSearch} className="flex items-center w-full md:w-auto mt-4 md:mt-0">
          <input
            type="text"
            className="p-2 rounded-l-md text-black focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Search for movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="submit"
            className="p-2 bg-green-500 hover:bg-green-600 rounded-r-md transition-colors duration-300"
          >
            Search
          </button>
        </form>

        <div className="flex items-center space-x-4 mt-4 md:mt-0 relative">
          {user ? (
            <>
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-10 h-10 flex items-center justify-center bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors duration-300 relative"
              >
                {user.username.slice(0, 2).toUpperCase()}
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 top-12 md:top-10 bg-white text-gray-900 border border-gray-300 rounded-lg shadow-lg z-50">
                  <Link to="/favorites" className="block px-4 py-2 hover:bg-gray-100 transition-colors duration-300">Favorites</Link>
                  <Link to="/search-history" className="block px-4 py-2 hover:bg-gray-100 transition-colors duration-300">Search History</Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors duration-300"
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-400 transition-colors duration-300">Login</Link>
              <Link to="/signup" className="hover:text-gray-400 transition-colors duration-300">Signup</Link>
            </>
          )}
        </div>

        <button
          onClick={toggleDarkMode}
          className="md:ml-4 p-2 rounded-md border border-gray-600 hover:bg-gray-200 transition-colors duration-300"
        >
          {isDarkMode ? (
            <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1M12 20v1M4.22 4.22l.71.71M19.07 19.07l.71.71M3 12h1M20 12h1M4.22 19.07l.71-.71M19.07 4.22l.71-.71"></path>
            </svg>
          ) : (
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1M12 20v1M4.22 4.22l.71.71M19.07 19.07l.71.71M3 12h1M20 12h1M4.22 19.07l.71-.71M19.07 4.22l.71-.71"></path>
            </svg>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;