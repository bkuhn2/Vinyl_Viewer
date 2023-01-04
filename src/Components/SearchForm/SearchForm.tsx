import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './_SearchForm.scss'
import ArtistResults from '../ArtistResults/ArtistResults';

type Props = {
}

const SearchForm = (props: Props) => {

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [albumsByArtist, setAlbumsByArtist] = useState([]);
  let searchName: string = useParams().artistName!;
  let currentArtist: string;

  const searchArtists = () => {
    fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${searchName}&api_key=fcf48a134034bb684aa87d0e0309a0fd
    &format=json`)
      .then(response => response.json())
      .then(data => {
        setSearchResults(data.results.artistmatches.artist.map((datum: {name: string}) => datum.name));
      });

    clearSearchTerm();
  }

  const clearSearchTerm = () => {
    setSearchTerm('')
  }

  useEffect(() => {
    if (searchName) {
      searchArtists()
    }
  }, [searchName])

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
        <Link to={`/search/${searchTerm}`}>
          <button className='search-button'>Search</button>
        </Link>
      </form>
      {searchName && <ArtistResults name={searchName} results={searchResults}/>}
      {/* have a conditional here for carousel */}
    </div>
  )
}

export default SearchForm
