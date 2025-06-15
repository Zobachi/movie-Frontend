// client/src/components/MovieCard.js
import React from 'react';
import { Card, Button } from 'react-bootstrap';

const MovieCard = ({
  movie,
  onAddFavorite,
  onAddWatchlist,
  onRemoveFavorite,
  onRemoveWatchlist,
  genresList = [],
}) => {
  const { title, poster_path, release_date, overview, genre_ids = [] } = movie;

  const imageUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  const genreNames = genre_ids
    .map((id) => genresList.find((g) => g.id === id)?.name)
    .filter(Boolean)
    .join(', ');

  return (
    <Card className="h-100 shadow-sm">
      <Card.Img
        variant="top"
        src={imageUrl}
        alt={title}
        style={{ height: '400px', objectFit: 'cover' }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Release: {release_date}
        </Card.Subtitle>
        <Card.Text style={{ flexGrow: 1 }}>
          {overview?.slice(0, 100)}...
        </Card.Text>
        <small className="text-muted mb-2">{genreNames}</small>

        <div className="d-flex justify-content-between">
          {onAddFavorite && (
            <Button variant="danger" size="sm" onClick={() => onAddFavorite(movie)}>
              ❤️ Favorite
            </Button>
          )}
          {onAddWatchlist && (
            <Button variant="warning" size="sm" onClick={() => onAddWatchlist(movie)}>
              📺 Watchlist
            </Button>
          )}
          {onRemoveFavorite && (
            <Button variant="outline-danger" size="sm" onClick={() => onRemoveFavorite(movie)}>
               Remove Favorite
            </Button>
          )}
          {onRemoveWatchlist && (
            <Button variant="outline-warning" size="sm" onClick={() => onRemoveWatchlist(movie)}>
               Remove Watchlist
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default MovieCard;
