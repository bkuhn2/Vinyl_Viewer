import React from 'react'

type Props = {
  albums: Array<
  {name: string, 
    picURL: string
  }
  >
}

const Carousel = ({ albums }: Props) => {

  const displayAlbums = albums.map((album, index) => {
    return (
      <div 
        className="albumTile" 
        key={index} 
        style={{ 
          backgroundImage: `url(${album.picURL})` 
        }}
      >{album.name}</div>
    ) 
      })

    return (
      <div className="carousel-container">
        {displayAlbums}
      </div>
    )
  }



export default Carousel
