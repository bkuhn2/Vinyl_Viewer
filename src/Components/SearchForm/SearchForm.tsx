import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './_SearchForm.scss';
import ArtistResults from '../ArtistResults/ArtistResults';
import Carousel from '../Carousel/Carousel';


interface FetchAlbumsDatum {
  artist: {name: string},
  name: string, 
  image: [{size: string, '#text': string}, {size: string, '#text': string}, {size: string, '#text': string}, {size: string, '#text': string}]
}

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
        console.log('search artists data: ', data);
        

        setSearchResults(
          data.results.artistmatches.artist.map((datum: {name: string}) => datum.name)
        );

        //clean up & to replace with 'and'? fetch doesn't seem to recognize '&' if it's in the name, only shows first artist

      });
    clearSearchField();
  }

  const retrieveAlbums = (selectedArtist: string) => {
    fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${selectedArtist}&api_key=fcf48a134034bb684aa87d0e0309a0fd&format=json`)
      .then(response => response.json())
      .then(data => {
        console.log('getAlubms data: ', data);
        
        const fetchedAlbums = data.topalbums.album.map((datum: FetchAlbumsDatum) => {
          return {
            artist: datum.artist.name,
            name: datum.name, 
            picURL: datum.image[3]['#text']
          }
        })
        //clean up functions: remove null/blank names; if no img url, supply a basic stock record; filter out any that are too "niche"? Only top 20?
        //error handling - sometimes just because Last.fm gives you an artist name, doesn't mean they have any album data and will throw an error (see Smash Mouth)
        setAlbumsByArtist(fetchedAlbums)
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
