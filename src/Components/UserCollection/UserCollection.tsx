import React, { useState, FC } from 'react'
import './_UserCollection.scss'

interface AlbumsArray {
  id: number
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
  
  const filterAlbums = () => {
    
    let myAlbums = savedAlbums.filter(album => {
      return album.albumTitle === filterCollection
    })  
    console.log(myAlbums);
    
    return (
      <main className='my-collection'>
        <div className='form'>
          <input
            type='text'
            placeholder='Search by Album'
            value={filterCollection}
            onChange={event => setFilter(event.target.value)}
          />
        <button onClick={() => filterAlbums()}>Search</button>
        </div>
        <div className='album-display'>
        {myAlbums.map((album) => {
          return (
            <div>
              <p>{album.albumTitle}</p>
              <p>{album.artist}</p>
              <p>{album.year}</p>
              <p>{album.coverUrl}</p>
            </div>
        )
      })}
        </div>
      </main>
    )
  }
    if(savedAlbums.length === 0){
      return(
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
        <div>
          <p>Nothing to display, go search and save some albums!</p>
        </div>
      </div>
      </main>      
    )
  } else {
  
    return (
      <main className='my-collection'>
        <div className='form'>
          <input
            type='text'
            placeholder='Search by Album'
            value={filterCollection}
            onChange={event => setFilter(event.target.value)}
          />
        <button onClick={() => filterAlbums()}>Search</button>
      </div>
      <div className='album-display'>
      {savedAlbums.map((album) => {
        return (
          <div className='album-card'>
            <p>{album.albumTitle}</p>
            <p>{album.artist}</p>
            <p>{album.year}</p>
            <img src={album.coverUrl} alt={'Album cover of ' + album.albumTitle}></img>
          </div>
        )
      })}
      </div>
      </main>
      
      
    )
    }
}

export default UserCollection
