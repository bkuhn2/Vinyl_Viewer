import React, { useState, FC } from 'react'
import AlbumCard from '../AlbumCard/AlbumCard'
import './_UserCollection.scss'

interface AlbumsArray {
  id: number,
  albumTitle: string,
  artist: string, 
  year: number,
  coverUrl: string
}

interface Props {
  savedAlbums: AlbumsArray[]
}

const UserCollection: FC<Props> = ({ savedAlbums }) => {
  const[filterCollection, setFilter] = useState('')
  const[filteredCollection, setCollection] = useState<AlbumsArray[]>(savedAlbums)

  const filterAlbums = () => {
    if(filterCollection === ''){
      return filteredCollection
    } else {
      let myAlbums = savedAlbums.filter(album => {
      return album.artist.includes(filterCollection)
      })  
      return setCollection(myAlbums)
    }
  }

  const clearInputs = () => {

    setCollection(savedAlbums)
  }
  
  return (
    <main className='my-collection'>
      <div className='form'>
        <input
          type='text'
          placeholder='Search by Artist Name'
          value={filterCollection}
          onChange={event => setFilter(event.target.value)}
        />
        <button onClick={() => filterAlbums()}>Search Artist</button>
        <button onClick={() => clearInputs()}>Clear Search Filter</button>
      </div>
      <div className='album-display'>
        {savedAlbums.length === 0 && <h2>Nothing to display, go search and save some albums!</h2>}
        {savedAlbums.length > 0 && <AlbumCard albumCards={filteredCollection}/>}
      </div>
    </main> 
  )
}

export default UserCollection;
