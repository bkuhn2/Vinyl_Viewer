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
      <div
        className="album-tile" 
        key={index} 
      >
        <img
        src={album.picURL}
        />
        <Link className={'class'} to={`/album/${formatURLString(artist)}/${formatURLString(album.name)}`}>Click</Link>

        <h2>{album.name}</h2>
      </div>
    ) 
  })

    return (
      <div className="carousel-container">
        {displayAlbums}
      </div>
    )
  }



export default Carousel
