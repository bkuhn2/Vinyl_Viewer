import React, { useState } from 'react';
import './_App.scss';
import { Routes, Route } from 'react-router-dom';
import Home from '../Home/Home';
import MainLayout from '../MainLayout/MainLayout';
import SearchForm from '../SearchForm/SearchForm';
import AlbumDetails from '../AlbumDetails/AlbumDetails';
import UserCollection from '../UserCollection/UserCollection';

interface SavedAlbum {
  id: number
  albumTitle: string,
  artist: string, 
  year: number,
  coverUrl: string
}


function App() {
  const[userCollection, setUserCollection] = useState<SavedAlbum[]>([
      {id: 1, albumTitle: "Mojo", artist: "Tom Petty", year: 2010, coverUrl: "image"}, 
      {id: 2, albumTitle: "Gone Gator", artist: "Tom Petty & the Heartbreakers", year: 1976, coverUrl: "image"}
    ])
    
  const addToCollection = (album: SavedAlbum): void => {
    setUserCollection(userCollection => [...userCollection, album])
  }
  
  return (
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/' element={<MainLayout />}>
        <Route path='/search' >
          <Route index element={<SearchForm />}/>
          <Route path=':artistName' element={<SearchForm />}/>
        </Route>
        <Route path='/album/:id' element={<AlbumDetails />}/>
        <Route path='/my-collection' element={<UserCollection savedAlbums={userCollection}/>}/>
      </Route>
    </Routes>
  );
}

export default App;
