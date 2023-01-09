import { useState, FC } from 'react'
import {SavedAlbum} from "../../interfaces"
import Carousel, {CarouselTile} from '../Carousel/Carousel'
import './_UserCollection.scss'


interface Props {
  savedAlbums: SavedAlbum[]
  deleteAlbum: (deleteName: string) => void
}
 

const UserCollection: FC<Props> = ({ savedAlbums, deleteAlbum }) => {
  const[filterCollection, setFilter] = useState('')


  const filteredCollection = !!filterCollection ? savedAlbums.filter(album => album.artist.toLowerCase().includes(filterCollection.toLowerCase()) || album.name.toLowerCase().includes(filterCollection.toLowerCase())) : savedAlbums

  
  return (
    <section className='my-collection'>
      <header className='collection-header'>
        <h1 className='title-header'>My Collection</h1>
      </header>
      <div className='form'>
        <input
          className='search-input'
          type='text'
          placeholder='Search by Artist or Album'
          value={filterCollection} 
          onChange={event => setFilter(event.target.value)}
        />
        {savedAlbums.length === 0 && <h2>Nothing to display, go search and save some albums!</h2>}
        <Carousel>
          {filteredCollection.map((album, index) => {
            return (
              <CarouselTile album={album} key={index} width={`${1/3*100}%`} deleteAlbum={deleteAlbum}></CarouselTile>
            )
        })}</Carousel>
      </div>
    </section> 
  )
}

export default UserCollection;
