import {FC, useEffect, useState} from "react"
import {useParams} from "react-router-dom"

import AlbumDetails from "./AlbumDetails"

import {SavedAlbum} from "../../interfaces"
import {AlbumInterface, FetchedTrack} from "../../interfaces"

interface ContainerProps {
  addToCollection: Function
  userCollection: SavedAlbum[]
}

const AlbumDetailsContainer: FC<ContainerProps> = ({
  addToCollection,
  userCollection,
}) => {
  const [album, setAlbum] = useState<AlbumInterface>()
  const [error, setError] = useState(null)
  const {artistName, albumName} = useParams()

  useEffect(() => {
    getPage()
  }, [])

  const getPage = async () => {
    try {
      const response = await fetch(
        `http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=fcf48a134034bb684aa87d0e0309a0fd&artist=${artistName}&album=${albumName}&format=json`
      )
      if (response.ok) {
        const {album} = await response.json()
        setAlbum({
          name: album.name,
          artist: album.artist,
          image: album.image[4]["#text"],
          tracks: !!album.tracks
            ? album.tracks.track.map((track: FetchedTrack) => ({
                name: track.name,
                duration: track.duration,
                trackNum: track["@attr"]["rank"],
                artist: album.artist,
                album: album.name,
              }))
            : null,
          releaseDate: !!album.wiki?.published ? album.wiki.published : null,
          article: !!album.wiki?.summary ? album.wiki.summary : null,
          lastURL: album.url,
        })
      } else {
        throw Error(response.statusText)
      }
    } catch (error: any) {
      setError(error.message)
    }
  }

  return (
    <div className="album-section-parent">
      {!!album && (
        <AlbumDetails
          addToCollection={addToCollection}
          userCollection={userCollection}
          album={album}
        />
      )}
      {!album && !error && <h1>loading...</h1>}
      {error && <h1 data-cy="album-detail-error">Sorry! It looks like something broke on our end.</h1>}
    </div>
  )
}

export default AlbumDetailsContainer
