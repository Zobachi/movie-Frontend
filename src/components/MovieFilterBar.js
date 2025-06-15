// client/src/components/MovieFilterBar.js
import React from 'react';
import { Form } from 'react-bootstrap';

const MovieFilterBar = ({
  searchQuery,
  setSearchQuery,
  selectedGenre,
  setSelectedGenre,
  sortBy,
  setSortBy,
  genres = [],
}) => {
  return (
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
  );
};

export default MovieFilterBar;
