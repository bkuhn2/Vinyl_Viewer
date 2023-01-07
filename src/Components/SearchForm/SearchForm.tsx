import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './_SearchForm.scss';
import ArtistResults from '../ArtistResults/ArtistResults';
import Carousel from '../Carousel/Carousel';
import fetchData from '../../Helper/APIcalls';
import { FetchAlbumsDatum, FetchArtistsDatum, SearchedAlbumsState } from '../../interfaces';
import { formatSearchedAlbums, formatSearchedArtists } from '../../Helper/CleanUp';



const SearchForm = () => {

  const [searchField, setSearchField] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [albumsByArtist, setAlbumsByArtist] = useState<SearchedAlbumsState[]>([]);
  let searchName: string = useParams().searchName!;  
  let selectedArtist: string = useParams().artistName!;

  const searchArtists = () => {
    fetchData(`http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${searchName}&api_key=fcf48a134034bb684aa87d0e0309a0fd
    &format=json`)
      .then(data => {        
        setSearchResults(formatSearchedArtists(data.results.artistmatches.artist));
      })
      .catch(error => {
        console.log('fetch catch error (need DOM to show as well)', error);
      });
    clearSearchField();
  }

  const retrieveAlbums = (selectedArtist: string) => {
    fetchData(`http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${selectedArtist}&api_key=fcf48a134034bb684aa87d0e0309a0fd&format=json`)
      .then(data => {
        if (data.topalbums) {
          setAlbumsByArtist(formatSearchedAlbums(data.topalbums.album))
        } else if (data.error) {
          throw new Error(data.message)
        }
      })
      .catch(error => {
        console.log('fetch catch error (need DOM to show as well)', error.message);
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
      <header className='search-header'>
        <h1>Explore</h1>
      </header>
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
      {selectedArtist && 
        <Carousel albums={ albumsByArtist } artist={ selectedArtist } />}
    </div>
  )
}

export default SearchForm
