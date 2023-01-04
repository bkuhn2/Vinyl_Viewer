import React, { useState } from 'react'
import './_UserCollection.scss'
import AlbumCard from '../AlbumCard/AlbumCard'

interface AlbumsListProps {
  savedAlbums: {title: string; id: number; image: string}[];
}


const UserCollection = (savedAlbums: AlbumsListProps) => {
  const[filterCollection, setFilter] = useState('')
  
  return (
    <main className='my-collection'>
      <div className='form'>
        <input
          type='text'
          placeholder='Search by Album'
          value={filterCollection}
          onChange={event => setFilter(event.target.value)}
        />
      <button>Search</button>
    </div>
    <div className='album-display'>
     {savedAlbums.savedAlbums.map((album) => {
      return (
        <div>
          <p>{album.title}</p>
          {/* <p>{album.id}</p> */}
          <p>{album.image}</p>
        </div>
      )
     })}
    </div>
    </main>
    
   
  )
}

export default UserCollection
