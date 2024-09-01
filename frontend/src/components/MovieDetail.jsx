import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { FaHeart, FaPlay } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';

function MovieDetail() {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [posters, setPosters] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [videos, setVideos] = useState([]);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [user, setUser] = useState(null);
  const YOUR_API_KEY = '5d4443b8010aed5d0d7a3a58ae31aae5';

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem('user'));
    setUser(loggedUser);
    
    const fetchMovieDetails = async () => {
      try {
        const [movieRes, castRes, postersRes, reviewsRes, recommendationsRes, videosRes] = await Promise.all([
          axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${YOUR_API_KEY}`),
          axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${YOUR_API_KEY}`),
          axios.get(`https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${YOUR_API_KEY}`),
          axios.get(`https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${YOUR_API_KEY}`),
          axios.get(`https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${YOUR_API_KEY}`),
          axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${YOUR_API_KEY}`)
        ]);

        setMovie(movieRes.data);
        setCast(castRes.data.cast);
        setPosters(postersRes.data.posters);
        setReviews(reviewsRes.data.results);
        setRecommendations(recommendationsRes.data.results);
        setVideos(videosRes.data.results);
        trackMovieVisit(movieRes.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  const trackMovieVisit = (movie) => {
    const history = JSON.parse(localStorage.getItem('searchHistory')) || [];
    if (!history.some(item => item.id === movie.id)) {
      history.push(movie);
      localStorage.setItem('searchHistory', JSON.stringify(history));
    }
  };

  const handleAddToFavorites = () => {
    if (!user) {
      alert('Please log in to add to favorites.');
      return;
    }

    const favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
    const movieExists = favoriteMovies.some(fav => fav.id === movie.id);

    if (movieExists) {
      alert('Movie already in favorites!');
    } else {
      favoriteMovies.push(movie);
      localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
      alert('Movie added to favorites!');
    }
  };

  const handleAddReview = async (e) => {
    e.preventDefault();

    if (!user) {
      alert('Please log in to add a review.');
      return;
    }

    try {
      const newReviewObj = {
        author: user.username,
        content: newReview,
        created_at: new Date().toISOString(), 
      };
      setReviews([...reviews, newReviewObj]);
      setNewReview(''); 
      alert('Review added!');
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  const handleRecommendationClick = (id) => {
    navigate(`/movie/${id}`);
    window.scrollTo(0, 0);
  };

  if (!movie) return <div className="p-4">Loading...</div>;

  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 2);

  return (
    <div 
      className="p-4 min-h-screen relative" 
      style={{ 
        backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.7
      }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
      <div className="relative z-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
          <div className="flex mb-8">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-64 h-auto rounded-lg shadow-lg"
            />
            <div className="ml-8 flex-1">
              <div className="flex items-center mb-4">
                <div className="w-24 h-24 mr-4">
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
                <div>
                  <p className="text-sm mb-2">{moment(movie.release_date).format('MMMM YYYY')}</p>
                  <p className="text-lg font-bold mb-2">{movie.title}</p>
                  <p className="mb-2">Genre: {movie.genres.map(g => g.name).join(', ')}</p>
                  <p className="mb-4">{movie.overview}</p>
                  <button 
                    className="bg-red-500 text-white p-2 rounded-lg flex items-center mb-4 hover:bg-red-600 transition"
                    onClick={handleAddToFavorites}
                  >
                    <FaHeart className="mr-2" /> Add to Favorites
                  </button>
                  <button 
                    className="bg-green-500 text-white p-2 rounded-lg flex items-center hover:bg-green-600 transition"
                  >
                    <FaPlay className="mr-2" /> Watch Now
                  </button>
                </div>
              </div>
            </div>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Cast</h2>
            <div className="flex overflow-x-scroll scrollbar-hide space-x-4">
              {cast.map(actor => (
                <div key={actor.id} className="flex-shrink-0 w-32">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                    alt={actor.name}
                    className="w-full h-auto rounded-lg shadow-lg"
                  />
                  <p className="text-sm text-center mt-2">{actor.name}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Posters</h2>
            <div className="flex overflow-x-scroll scrollbar-hide space-x-4">
              {posters.map(poster => (
                <img
                  key={poster.file_path}
                  src={`https://image.tmdb.org/t/p/w500${poster.file_path}`}
                  alt={movie.title}
                  className="w-32 h-auto rounded-lg shadow-lg"
                />
              ))}
            </div>
          </section>
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Related Videos</h2>
            <div className="flex overflow-x-scroll scrollbar-hide space-x-4">
              {videos.map(video => (
                <div key={video.id} className="flex-shrink-0 w-64">
                  <div className="relative">
                    <iframe
                      src={`https://www.youtube.com/embed/${video.key}`}
                      title={video.name}
                      className="w-full h-36 rounded-lg shadow-lg"
                      allowFullScreen
                    ></iframe>
                    <p className="text-sm mt-2 text-center">{video.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Reviews</h2>
            {displayedReviews.length > 0 ? (
              displayedReviews.map((review, index) => (
                <div key={index} className="mb-4 p-4 border border-gray-300 rounded-lg shadow-lg">
                  <p className="text-lg font-bold">{review.author}</p>
                  <p className="text-sm mb-2">{moment(review.created_at).format('MMMM Do YYYY, h:mm:ss a')}</p>
                  <p>{review.content}</p>
                </div>
              ))
            ) : (
              <p>No reviews available.</p>
            )}
            {!showAllReviews && reviews.length > 2 && (
              <button
                onClick={() => setShowAllReviews(true)}
                className="bg-blue-500 text-white p-2 rounded-lg mt-4 hover:bg-blue-600 transition"
              >
                Show More
              </button>
            )}
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Add a Review</h2>
            <form onSubmit={handleAddReview}>
              <textarea
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                rows="4"
                className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
                placeholder="Write your review here..."
              />
              <button
                type="submit"
                className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition"
              >
                Submit Review
              </button>
            </form>
          </section>

          

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Recommendations</h2>
            <div className="flex overflow-x-scroll scrollbar-hide space-x-4">
              {recommendations.map(recommendation => (
                <div
                  key={recommendation.id}
                  className="flex-shrink-0 w-64 cursor-pointer"
                  onClick={() => handleRecommendationClick(recommendation.id)}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500${recommendation.poster_path}`}
                    alt={recommendation.title}
                    className="w-full h-auto rounded-lg shadow-lg"
                  />
                  <p className="text-sm mt-2 text-center">{recommendation.title}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
