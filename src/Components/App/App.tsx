import { useState, useEffect } from 'react';
import './_App.scss';
import { Routes, Route } from 'react-router-dom';
import Home from '../Home/Home';
import MainLayout from '../MainLayout/MainLayout';
import SearchForm from '../SearchForm/SearchForm';
import AlbumDetails from '../AlbumDetails/AlbumDetails';
import UserCollection from '../UserCollection/UserCollection';

export interface SavedAlbum {
  id: number,
  albumTitle: string,
  artist: string,
  releaseDate: string,
  coverUrl: string
}

function App() {
  const [userCollection, setUserCollection] = useState<SavedAlbum[]>([])

  const addToCollection = (album: SavedAlbum): void => {
    setUserCollection(collection => [...collection, album])
  }

  return (
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/' element={<MainLayout />}>
        <Route path='/search' >
          <Route index element={<SearchForm />}/>
          <Route path=':artistName' element={<SearchForm />}/>
        </Route>
        <Route path='/album/:artistName/:albumName' element={<AlbumDetails userCollection={userCollection} addToCollection={addToCollection} />}/>
        <Route path='/my-collection' element={<UserCollection />}/>
      </Route>
    </Routes>
  );
}

export default App;
