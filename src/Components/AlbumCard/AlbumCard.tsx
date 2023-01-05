import React, { FC } from 'react'
import './_AlbumCard.scss'

interface AlbumsArray {
  id: number,
  albumTitle: string,
  artist: string, 
  year: number,
  coverUrl: string
}

interface Props {
  albumCards: AlbumsArray[]
}


const AlbumCard: FC<Props> = ({ albumCards }) => {
  const newCards = albumCards.map(album => {
    return (
      <div className='single-card'>
        <p>{album.id}</p>
        <p>{album.albumTitle}</p>
        <p>{album.artist}</p>
        <p>{album.year}</p>
        <img src={album.coverUrl} alt={"Album cover image of " + album.albumTitle}></img>
      </div>
    )
  })



  return( 
    <div className='album-cards'>
      {newCards}
    </div>
    )
}

export default AlbumCard
