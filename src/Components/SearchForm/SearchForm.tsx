import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './_SearchForm.scss'
import ArtistResults from '../ArtistResults/ArtistResults';

const SearchForm = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [albumsByArtist, setAlbumsByArtist] = useState([]);

  const searchArtists = (event: React.SyntheticEvent) => {
    event.preventDefault();

    fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${searchTerm}&api_key=fcf48a134034bb684aa87d0e0309a0fd
    &format=json`)
      .then(response => response.json())
      .then(data => {
        setSearchResults(data.results.artistmatches.artist);
      });

    clearInputs();
  } /*Need declare searchArtists type?? not as void??*/

  const clearInputs = () => {
    setSearchTerm('')
  }

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
        <Link 
          to={`/search/${searchTerm}`}
          onClick={event => searchArtists(event)} 
        >
          <button className='search-button'>Search</button>
        </Link>
      </form>
      <section>
        <ArtistResults />
      </section>
    </div>
  )
}

export default SearchForm
