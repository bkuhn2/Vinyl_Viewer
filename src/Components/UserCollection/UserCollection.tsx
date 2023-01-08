import { useState, FC, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {SavedAlbum} from "../../interfaces"
import Carousel from '../Carousel/Carousel'
import './_UserCollection.scss'

interface Props {
  savedAlbums: SavedAlbum[]
}
 

const UserCollection: FC<Props> = ({ savedAlbums }) => {
  const[filterCollection, setFilter] = useState('')
  const[filteredCollection, setCollection] = useState<SavedAlbum[]>(savedAlbums)
  

  const deleteAlbum = (deleteName: string) => {
      let newSaved = savedAlbums.filter(album => {
        return album.name !== deleteName
      })
      console.log(newSaved);
     return setCollection(newSaved)
  }

  const filterAlbums = () => {
    if(filterCollection === ''){
      return filteredCollection
    } else {
      let myAlbums = savedAlbums.filter(album => {
      return album.artist.toLowerCase().includes(filterCollection.toLowerCase()) || album.name.toLowerCase().includes(filterCollection.toLowerCase())
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
          placeholder='Search by Artist or Album'
          value={filterCollection} 
          onChange={event => setFilter(event.target.value)}
        />
        <button className='filter-button' onClick={() => filterAlbums()}>Search</button>
        <button className='clear-filter-button' onClick={() => clearInputs()}>Clear Search Filter</button>
        {savedAlbums.length === 0 && <h2>Nothing to display, go search and save some albums!</h2>}
        {<Carousel albums={filteredCollection} artist={''} deleteAlbum={deleteAlbum}/>}
      </div>
    </section> 
  )
}

export default UserCollection;
