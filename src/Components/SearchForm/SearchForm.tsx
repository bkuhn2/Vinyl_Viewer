import React, { useState } from 'react';
import './_SearchForm.scss'

const SearchForm = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [albumsByArtist, setAlbumsByArtist] = useState([]);

  return (
    <div className='search-page'>
      <h1>Explore</h1>
      <form className='search-form'>
        <input
          className='search-input' 
          type='text' 
          placeholder='Search for your favorite artists' 
          value={searchTerm} 
          onChange={event => setSearchTerm(event.target.value)}
          />
        <button className='search-button'>Search</button>
      </form>
    </div>
  )
}

export default SearchForm
