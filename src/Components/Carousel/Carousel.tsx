import React, { useState } from 'react'
import './_Carousel.scss'
import { formatURLString } from '../../Helper/CleanUp'
import { Link, useLocation } from 'react-router-dom'

interface carouselTileData  {
  album: {
    artist: string,
    name: string, 
    picURL: string,
  },
  children?: React.ReactNode,
  width: string,
}

interface carouselData {
  children: React.ReactNode
}

export const CarouselTile = ({ album, width }: carouselTileData) => {
  return (
    <Link
      className="album-tile"
      to={`/album/${formatURLString(album.artist)}/${formatURLString(album.name)}`}
      style={{ width: width}}
    >
      <div className="carousel-title-container">
        <p className="carousel-title">{album.artist}</p>
        <p className="carousel-title">{album.name}</p>
      </div>
      <img
        className="album-image"
        src={album.picURL}
        alt={"Album cover image of " + album.name}
      />

    </Link>
  )
}

const Carousel = ({ children }: carouselData) => {
  const [activeAlbum, newActiveAlbum] = useState(0)
  const updateAlbum = ( albumIndex: number ) => {
      if (albumIndex < 0) {
          albumIndex = React.Children.count(children) - 1
      } 
      else if (albumIndex >= React.Children.count(children)) {
          
          albumIndex = 0
      }

      newActiveAlbum(albumIndex)
  }
  return (
    <div className="carousel-container">

        <button
          className="carousel-navigate"
          onClick={() => {
          updateAlbum(activeAlbum - 1)
        }}
        >
        {'<'}
        </button>
      <div className="carousel">
          <div className="inner" style={{ transform: `translateX(-${activeAlbum * 1/3 * 100}%)` }}>
              {React.Children.map(children, (child) => {
                  if(React.isValidElement(child)) {
                    return React.cloneElement(child)
                  }
                  return
              })}
          </div>
      </div>
        <button 
          className="carousel-navigate"
          onClick={() => {
            updateAlbum(activeAlbum + 1)
          }}
        >
        {'>'}
        </button>

    </div>
  )
}

export default Carousel

