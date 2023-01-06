import React from 'react'
import './_Carousel.scss';

type Props = {
  albums: Array<{
    name: string, 
    picURL: string
  }>
}

const Carousel = ({ albums }: Props) => {

  const displayAlbums = albums.map((album, index) => {
    return (
      <div 
        className="album-tile" 
        key={index} 
      >
        <img
        src={album.picURL}
        />
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
