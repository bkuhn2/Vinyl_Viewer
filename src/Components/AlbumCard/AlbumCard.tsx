import { keyboard } from '@testing-library/user-event/dist/keyboard'
import React, { FC } from 'react'
import './_AlbumCard.scss'

interface Props {
  key: number, 
  id: number, 
  title: string, 
  artist: string, 
  year: string, 
  cover: string
}

const AlbumCard = ({id, title, artist, year, cover}: Props) => {
    return (
      <div className='single-card' >
        <p>{id}</p>
        <p>{title}</p>
        <p>{artist}</p>
        <p>{year}</p>
        <img src={cover} alt={"Album cover image of " + title}></img>
      </div>
    )
}

export default AlbumCard
