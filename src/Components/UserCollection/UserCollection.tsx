import { useState, FC } from 'react'
import AlbumCard from '../AlbumCard/AlbumCard'
import { SavedAlbum } from '../App/App'
import './_UserCollection.scss'

interface Props {
  savedAlbums: SavedAlbum[]
}

const UserCollection: FC<Props> = ({ savedAlbums }) => {
  const[filterCollection, setFilter] = useState('')
  const[filteredCollection, setCollection] = useState<SavedAlbum[]>(savedAlbums)

  const filterAlbums = () => {
    if(filterCollection === ''){
      return filteredCollection
    } else {
      let myAlbums = savedAlbums.filter(album => {
      return album.artist.toLowerCase().includes(filterCollection.toLowerCase())
      })  
      return setCollection(myAlbums)
    }
  }

  const clearInputs = () => {
    setFilter('')
    setCollection(savedAlbums)
  }
  
  return (
    <section className='my-collection'>
      <header className='collection-header'>
        <h1>My Collection</h1>
      </header>
      <div className='form'>
        <input
          className='search-input'
          type='text'
          placeholder='Search by Artist Name'
          value={filterCollection}
          onChange={event => setFilter(event.target.value)}
        />
        <button className='filter-button' onClick={() => filterAlbums()}>Search Artist</button>
        <button className='filter-button' onClick={() => clearInputs()}>Clear Search Filter</button>
      </div>
      <div className='album-display'>
        {savedAlbums.length === 0 && <h2>Nothing to display, go search and save some albums!</h2>}
        {filteredCollection.map(album => (
          <AlbumCard 
          key={album.id} 
          id={album.id}
          title={album.albumTitle}
          artist={album.artist}
          releaseDate={album.releaseDate}
          cover={album.coverUrl}
          />
        ))}
      </div>
    </section> 
  )
}

export default UserCollection;
