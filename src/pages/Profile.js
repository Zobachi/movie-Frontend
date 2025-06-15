import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import { Container, Row, Col, Tabs, Tab, Form } from 'react-bootstrap';
import MovieCard from '../components/MovieCard';
import { toast } from 'react-toastify';

const Profile = () => {
  const [favorites, setFavorites] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [genres, setGenres] = useState([]);
  const [activeTab, setActiveTab] = useState('favorites');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [sortBy, setSortBy] = useState('');

  // Fetch favorites, watchlist, and genres on mount
  useEffect(() => {
    const fetchUserLists = async () => {
      try {
        const res = await API.get('/user/profile');
        setFavorites(res.data.favorites || []);
        setWatchlist(res.data.watchlist || []);
      } catch (error) {
        toast.error('Failed to fetch profile data');
        console.error(error);
      }
    };

    const fetchGenres = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
        );
        const data = await res.json();
        setGenres(data.genres || []);
      } catch (error) {
        toast.error('Failed to fetch genres');
        console.error(error);
      }
    };

    fetchUserLists();
    fetchGenres();
  }, []);

  // Helpers
  const getGenreName = (genreId) => {
    const genre = genres.find((g) => g.id === genreId);
    return genre ? genre.name : '';
  };

  const filterMovies = (list) => {
    return list.filter((movie) => {
      const matchesTitle = movie.title?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGenre = selectedGenre
        ? movie.genre_ids?.includes(Number(selectedGenre))
        : true;
      return matchesTitle && matchesGenre;
    });
  };

  const sortMovies = (list) => {
    if (sortBy === 'title') {
      return [...list].sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'genre') {
      return [...list].sort((a, b) => {
        const genreA = getGenreName(a.genre_ids?.[0] || 0);
        const genreB = getGenreName(b.genre_ids?.[0] || 0);
        return genreA.localeCompare(genreB);
      });
    }
    return list;
  };

  const handleRemoveFavorite = async (movie) => {
    try {
      const res = await API.delete('/favorites', { data: { movie } });
      setFavorites(res.data.favorites);
      toast.success(`${movie.title} removed from favorites`);
    } catch (error) {
      toast.error('Failed to remove from favorites');
      console.error(error);
    }
  };

  const handleRemoveWatchlist = async (movie) => {
    try {
      const res = await API.delete('/watchlist', { data: { movie } });
      setWatchlist(res.data.watchlist);
      toast.success(`${movie.title} removed from watchlist`);
    } catch (error) {
      toast.error('Failed to remove from watchlist');
      console.error(error);
    }
  };

  const currentList = activeTab === 'favorites' ? favorites : watchlist;
  const filteredList = sortMovies(filterMovies(currentList));

  return (
    <>
      {/* Dropdown Menu Bar Below Navbar */}
      <div
        style={{
          backgroundColor: 'aqua',
          padding: '8px 16px',
          height: '56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '10px',
        }}
      >
        <Form.Control
          type="text"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: '30%' }}
        />

        <Form.Select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          style={{ width: '30%' }}
        >
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </Form.Select>

        <Form.Select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{ width: '30%' }}
        >
          <option value="">Sort by...</option>
          <option value="title">Title (A–Z)</option>
          <option value="genre">Genre (A–Z)</option>
        </Form.Select>
      </div>

      {/* Main Section */}
      <Container className="mt-4">
        <h2 className="mb-4">My Movie Lists</h2>

        <Tabs
          activeKey={activeTab}
          onSelect={(k) => {
            setActiveTab(k);
            setSearchQuery('');
            setSelectedGenre('');
            setSortBy('');
          }}
          className="mb-3"
        >
          <Tab eventKey="favorites" title="Favorites" />
          <Tab eventKey="watchlist" title="Watchlist" />
        </Tabs>

        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {filteredList.length === 0 ? (
            <p className="text-muted">No movies found.</p>
          ) : (
            filteredList.map((movie) => (
              <Col key={movie.id}>
                <MovieCard
                  movie={movie}
                  genresList={genres}
                  onRemoveFavorite={activeTab === 'favorites' ? handleRemoveFavorite : null}
                  onRemoveWatchlist={activeTab === 'watchlist' ? handleRemoveWatchlist : null}
                />
              </Col>
            ))
          )}
        </Row>
      </Container>
    </>
  );
};

export default Profile;
