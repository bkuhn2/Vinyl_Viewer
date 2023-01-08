import {useState} from 'react'
import './_Carousel.scss'
import formatURLString from '../../Helper/CleanUp'
import { Link } from 'react-router-dom'

type Props = {
  albums: Array<{
    artist: string,
    name: string, 
    picURL: string
  }>
  artist: string,
  deleteAlbum: (deleteName: string) => void
}

const Carousel = ({ albums, deleteAlbum }: Props) => {
  // const[isLoading, setLoading] = useState(false)

  // const deleteAlbum = (deleteName: string) => {
  //   let index = albums.findIndex(album => {
  //     return album.name === deleteName
  //   })
  //   setLoading(true)
  //   albums.splice(index, 1)
  // }


  const displayAlbums = albums.map((album, index) => {
    return (
      <Link
        className="album-tile" 
        key={index} 
        to={`/album/${formatURLString(album.artist)}/${formatURLString(album.name)}`}
      >
        <img
        className="album-image"
        src={album.picURL}
        />
        <h2>{album.name}</h2>
        {"localhost:3000/my-collection" && <Link to={''}> <button onClick={() => deleteAlbum(album.name)} className='delete-album'>Delete</button></Link>}
      </Link>
    ) 
  })

    return (
      <div className="carousel-container">
        {displayAlbums}
      </div>
    )
  }



export default Carousel
