import {useState} from "react"
import "./_App.scss"
import {Routes, Route} from "react-router-dom"
import Home from "../Home/Home"
import MainLayout from "../MainLayout/MainLayout"
import SearchForm from "../SearchForm/SearchForm"
import AlbumDetailsContainer from "../AlbumDetails/AlbumDetailsContainer"
import UserCollection from "../UserCollection/UserCollection"

import testCollectionData from "../../testCollectionData"

export interface SavedAlbum {
  id: number
  albumTitle: string
  artist: string
  releaseDate: string
  coverUrl: string
}

function App() {
  const [userCollection, setUserCollection] = useState<SavedAlbum[]>([
    // ...testCollectionData,
  ])

  const addToCollection = (album: SavedAlbum): void => {
    setUserCollection(collection => [...collection, album])
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/" element={<MainLayout />}>
        <Route path="/search">
          <Route index element={<SearchForm />} />
          <Route path=":searchName" element={<SearchForm />} />
          <Route path=":searchName/:artistName" element={<SearchForm />} />
        </Route>
        <Route
          path="/album/:artistName/:albumName"
          element={
            <AlbumDetailsContainer
              userCollection={userCollection}
              addToCollection={addToCollection}
            />
          }
        />
        <Route
          path="/my-collection"
          element={<UserCollection savedAlbums={userCollection} />}
        />
      </Route>
    </Routes>
  )
}

export default App
