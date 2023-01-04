import React, { useState } from 'react'

const SearchForm = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [albumsByArtist, setAlbumsByArtist] = useState([]);

  return (
    <div>
      <h1>Explore</h1>
      <form>
        <input 
          type='text' 
          placeholder='Search for your favorite artists' 
          value={searchTerm} 
          onChange={event => setSearchTerm(event.target.value)}
          />
        <button>Search</button>
      </form>
    </div>
  )
}

export default SearchForm
