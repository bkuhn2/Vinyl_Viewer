import { useState, FC } from 'react'
import { SavedAlbum } from '../App/App'
import Carousel, {CarouselTile} from '../Carousel/Carousel'
import './_UserCollection.scss'
import record from '../../Images/recordplaceholder.png'


interface Props {
  savedAlbums: SavedAlbum[]
}

const UserCollection: FC<Props> = ({ savedAlbums }) => {
  const[filterCollection, setFilter] = useState('')
  const[filteredCollection, setCollection] = useState<SavedAlbum[]>(savedAlbums)

  const carouselAlbum = filteredCollection.map((album) => {
    let artist = album.artist
    let name = album.albumTitle
    let picURL = album.coverUrl || record
    return {artist: artist, name: name, picURL: picURL}
  })

  const filterAlbums = () => {
    if(filterCollection === ''){
      return filteredCollection
    } else {
      let myAlbums = savedAlbums.filter(album => {
      return album.artist.toLowerCase().includes(filterCollection.toLowerCase()) || album.albumTitle.toLowerCase().includes(filterCollection.toLowerCase())
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
        {<Carousel>
          {carouselAlbum.map((album, index) => {
            return (
              <CarouselTile album={album} key={index} width={`${1/3*100}%`} ></CarouselTile>
            )
        })}</Carousel>}
      </div>
    </section> 
  )
}

export default UserCollection;
