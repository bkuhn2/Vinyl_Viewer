import {FC, useEffect, useState} from "react"
import {useParams, Link} from "react-router-dom"

import "./_AlbumDetails.scss"
import {AlbumInterface} from "../../Helper/fetchPage"
import formatReleaseDate from "../../Helper/formatReleaseDate"
import {SavedAlbum} from "../../interfaces"

import fallback from "../../assets/fallback.png"

interface Props {
  addToCollection: Function
  userCollection: SavedAlbum[]
  album: AlbumInterface
}

const AlbumDetails: FC<Props> = ({addToCollection, userCollection, album}) => {
  const {artistName, albumName} = useParams()
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    determineSaved()
  }, [])

  const determineSaved = () => {
    const isSaved = userCollection.some(album => {
      const sameArtistName =
        album.artist.toLowerCase() === artistName?.replace(/\+/g, " ")
      const sameAlbumName =
        album.name.toLowerCase() === albumName?.replace(/\+/g, " ")
      return sameArtistName && sameAlbumName
    })
    setIsSaved(isSaved)
  }

  const handleSubmit = () => {
    addToCollection({
      artist: album.artist,
      name: album.name,
      picURL: album.image,
    })
    setIsSaved(true)
  }

  const getReleaseDate = () => {
    const returnedDate: string = formatReleaseDate(album.releaseDate)
    formattedDate = returnedDate
    return returnedDate
  }

  let formattedDate: string

  const tracks = !!album.tracks
    ? album.tracks.map(track => {
        return <li key={track.trackNum}>{track.name}</li>
      })
    : null

  const previouslySavedMessage = (
    <div className="saved-message" data-cy="saved-message">
      <p>this album is saved in your collection</p>
    </div>
  )

  const formattedArticle = !!album.article
    ? album.article.substring(0, album.article.indexOf("<"))
    : null

  return (
    <>
      <span className="directory">
        <span className="directory__artist" data-cy="directory-artist">
          <Link to={`/search/${artistName}`}>{album.artist}</Link>
        </span>
        <span className="directory__album" data-cy="directory-album">
          {" "}
          / {album.name}
        </span>
      </span>
      <section className="album-section">
        <div className="album-details">
          <h1 className="album-details__name" data-cy="album-name">
            {album.name}
          </h1>
          {isSaved ? (
            previouslySavedMessage
          ) : (
            <button
              className="add-button"
              data-cy="add-button"
              onClick={() => handleSubmit()}
            >
              add to my collection
            </button>
          )}
          <p className="album-details__date" data-cy="album-date">
            {!!album.releaseDate && `released on: ${getReleaseDate()}`}
          </p>
          <article className="album-details__article" data-cy="album-article">
            {!!formattedArticle && `${formattedArticle}... (cont.)`}
          </article>
          <p className="album-details__last-link">
            {"view on "}
            <a href={album.lastURL} data-cy="album-link">
              Last.fm
            </a>
          </p>
          {!!tracks &&
            <ol className="album-details__tracklist" data-cy="album-tracklist">
              {tracks}
            </ol>
          }
        </div>
        <div className="cover">
          <div className="cover__mat">
            <img
              className="cover__mat__img"
              src={!!album.image ? album.image : fallback}
              alt={`album artwork for ${album.name} by ${album.artist}`}
              data-cy="album-cover"
            />
          </div>
        </div>
      </section>
    </>
  )
}

export default AlbumDetails
