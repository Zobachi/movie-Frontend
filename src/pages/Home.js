import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import MovieCard from '../components/MovieCard';
import { Container, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [watchlist, setWatchlist] = useState([]);

  // Fetch trending movies
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
        );
        const data = await res.json();
        setMovies(data.results || []);
      } catch (error) {
        toast.error('Failed to load movies');
        console.error(error);
      }
    };

    const fetchUserLists = async () => {
      try {
        const res = await API.get('/user/profile'); // Assuming backend returns both lists
        setFavorites(res.data.favorites || []);
        setWatchlist(res.data.watchlist || []);
      } catch (error) {
        console.error('User list fetch failed', error);
      }
    };

    fetchMovies();
    fetchUserLists();
  }, []);

  // Add to favorites
  const handleAddFavorite = async (movie) => {
    try {
      const res = await API.post('/favorites', { movie });
      setFavorites(res.data.favorites);
      toast.success(`${movie.title} added to favorites`);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to add to favorites');
    }
  };

  // Add to watchlist
  const handleAddWatchlist = async (movie) => {
    try {
      const res = await API.post('/watchlist', { movie });
      setWatchlist(res.data.watchlist);
      toast.success(`${movie.title} added to watchlist`);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to add to watchlist');
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Trending Movies</h2>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {movies.map((movie) => (
          <Col key={movie.id}>
            <MovieCard
              movie={movie}
              onAddFavorite={handleAddFavorite}
              onAddWatchlist={handleAddWatchlist}
              favorites={favorites}
              watchlist={watchlist}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;

