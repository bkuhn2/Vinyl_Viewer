import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './_SearchForm.scss'
import ArtistResults from '../ArtistResults/ArtistResults';


const SearchForm = () => {

  const [searchField, setSearchField] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [albumsByArtist, setAlbumsByArtist] = useState([]);
  let searchName: string = useParams().searchName!;  
  let selectedArtist: string = useParams().artistName!;

  const searchArtists = () => {
    fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${searchName}&api_key=fcf48a134034bb684aa87d0e0309a0fd
    &format=json`)
      .then(response => response.json())
      .then(data => {
        setSearchResults(
          data.results.artistmatches.artist.map((datum: {name: string}) => datum.name)
        );
      });
    clearSearchField();
  }

  const retrieveAlbums = (selectedArtist: string) => {
    fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${selectedArtist}&api_key=fcf48a134034bb684aa87d0e0309a0fd&format=json`)
      .then(response => response.json())
      .then(data => {
        setAlbumsByArtist(
          data.topalbums.album.map((datum: 
            {name: string, 
            image: [{size: string, '#text': string}, {size: string, '#text': string}, {size: string, '#text': string}, {size: string, '#text': string}]}
            ) => {
            return {name: datum.name, picURL: datum.image[3]['#text']}
          })
        )
      })
  }

  const clearSearchField = () => {
    setSearchField('')
  }

  useEffect(() => {
    if (searchName) {
      searchArtists()
    } {
      setSearchResults([])
    }
  }, [searchName])

  useEffect(() => {
    if (selectedArtist) {
      retrieveAlbums(selectedArtist)
    } else {
      setAlbumsByArtist([])
    }
  }, [selectedArtist])


  return (
    <div className='search-page'>
      <h1>Explore</h1>
      <form className='search-form'>
        <input
          className='search-input' 
          type='text' 
          placeholder='Search for your favorite artists' 
          value={searchField} 
          onChange={event => setSearchField(event.target.value)}
          />
        <Link to={`/search/${searchField}`}>
          <button className='search-button'>Search</button>
        </Link>
      </form>
      {(searchName && !selectedArtist) && <ArtistResults searchName={searchName} results={searchResults}/>}
      {selectedArtist && <h1>Carousel goes here</h1>}
    </div>
  )
}

export default SearchForm
