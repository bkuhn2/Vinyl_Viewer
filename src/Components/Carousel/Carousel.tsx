import React, { useState } from 'react'
import './_Carousel.scss'
import { formatURLString } from '../../Helper/CleanUp'
import { Link } from 'react-router-dom'


interface carouselTileData  {
    album: {
      artist: string,
      name: string, 
      picURL: string  
    },
    width?: string
}

interface carouselData {
  children?: JSX.Element,
  albumIndex?: number
}

export const CarouselTile = ({ album, width }: carouselTileData) => {
  console.log(width)
  return (
    <Link
      className="album-tile"
      to={`/album/${formatURLString(album.artist)}/${formatURLString(album.name)}`}
      style={{ width: width}}
    >
      <img
        className="album-image"
        src={album.picURL}
      />
      <h2 className="album-title">{album.name}</h2>
    </Link>
  )
}

const Carousel = ({ children }) => {
  const [activeAlbum, newActiveAlbum] = useState(0)
  const updateAlbum = (albumIndex) => {
      if (albumIndex < 0) {
          albumIndex = React.Children.count(children) - 1
      } 
      else if (albumIndex >= React.Children.count(children)) {
          
          albumIndex = 0
      }

      newActiveAlbum(albumIndex)
  }

  return (
      <div className="carousel">
          <div className="inner" style={{ transform: `translateX(-${activeAlbum * 100}%)` }}>
              {React.Children.map(children, (child) => {
                  return React.cloneElement(child, {width: "100%" })
              })}
          </div>
          <div className="indicators">
              <button 
                  onClick={() => {
                      updateAlbum(activeAlbum - 1)
                  }}
                  >
                      {'<'}
              </button>
              <button 
                  onClick={() => {
                      updateAlbum(activeAlbum + 1)
                  }}
                  >
                      {'>'}
              </button>
          </div>
      </div>
  )
}

export default Carousel

