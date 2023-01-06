import React from 'react'
import './_Carousel.scss'
import formatURLString from '../../Helper/CleanUp'
import { Link } from 'react-router-dom'

type Props = {
  albums: Array<{
    name: string, 
    picURL: string
  }>
  artist: string
}

const Carousel = ({ albums, artist }: Props) => {

  const displayAlbums = albums.map((album, index) => {
    return (
      <Link
        className="album-tile" 
        key={index} 
        to={`/album/${formatURLString(artist)}/${formatURLString(album.name)}`}
      >
        <img
        className="album-image"
        src={album.picURL}
        />
        <h2>{album.name}</h2>
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
