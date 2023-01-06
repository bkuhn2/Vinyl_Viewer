import { FC, useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import AlbumDetails from "./AlbumDetails"
import { SavedAlbum } from "../App/App"
import { fetchPage, AlbumInterface } from "../../Helper/fetchPage"

interface ContainerProps {
  addToCollection: Function
  userCollection: SavedAlbum[]
}

const AlbumDetailsContainer: FC<ContainerProps> = ({ addToCollection, userCollection}) => {
  const [album, setAlbum] = useState<AlbumInterface>()
  const {artistName, albumName} = useParams()

  useEffect(() => {
    console.log("got here")
    getPage()
  }, [])

  const getPage = async () => {
    const albumData = await fetchPage(
      `http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=fcf48a134034bb684aa87d0e0309a0fd&artist=${artistName}&album=${albumName}&format=json`
    )
    setAlbum(albumData)
  }

  if (!!album) {
    return (
      <AlbumDetails 
        addToCollection={addToCollection} 
        userCollection={userCollection}
        album={album}
      />
    )
  } else {
    return (
      <h1>Loading...</h1>
    )
  }
}

export default AlbumDetailsContainer