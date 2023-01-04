import React, {FunctionComponent, PropsWithChildren} from 'react';
import './_App.scss';
import { Routes, Route } from 'react-router-dom';
import Home from '../Home/Home';
import MainLayout from '../MainLayout/MainLayout';
import SearchForm from '../SearchForm/SearchForm';
import AlbumDetails from '../AlbumDetails/AlbumDetails';
import UserCollection from '../UserCollection/UserCollection';


function App() {

  const allAlbums = [
    {title: "tom petty", id: 1, image:"dummy url"}, 
    {title: "Master of Puppets", id: 2, image:"dummy url 2"}
  ];
  
  return (
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/' element={<MainLayout />}>
        <Route path='/search' >
          <Route index element={<SearchForm />}/>
          <Route path=':artistName' element={<SearchForm />}/>
        </Route>
        <Route path='/album/:id' element={<AlbumDetails />}/>
        <Route path='/my-collection' element={<UserCollection savedAlbums={allAlbums}/>}/>
      </Route>
    </Routes>
  );
}

export default App;
