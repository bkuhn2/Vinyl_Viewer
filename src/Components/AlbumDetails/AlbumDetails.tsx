import {FC, useEffect, useState} from "react"
import {useParams} from "react-router-dom"

import ghTemp from "../../assets/gh-cover-temp.jpeg"
import "./_AlbumDetails.scss"
import {fetchPage, AlbumInterface} from "../../Helper/fetchPage"
import {SavedAlbum} from "../App/App"

interface Props {
  addToCollection: Function
  userCollection: SavedAlbum[]
}

const AlbumDetails: FC<Props> = ({addToCollection, userCollection}) => {
  const {artistName, albumName} = useParams()
  const [album, setAlbum] = useState<AlbumInterface>()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    getPage()
    determineSaved()
  }, [])

  const getPage = async () => {
    const albumData = await fetchPage(
      `http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=fcf48a134034bb684aa87d0e0309a0fd&artist=${artistName}&album=${albumName}&format=json`
    )
    setAlbum(albumData)
    setIsLoading(false)
  }

  const determineSaved = () => {
    const isSaved = userCollection.some(album => {
      const sameArtistName =
        album.artist.toLowerCase() === artistName?.replace(/\+/g, " ")
      const sameAlbumName =
        album.albumTitle.toLowerCase() === albumName?.replace(/\+/g, " ")
      return sameArtistName && sameAlbumName
    })
    setIsSaved(isSaved)
  }

  const handleSubmit = () => {
    addToCollection({
      id: Date.now(),
      albumTitle: album?.name,
      artist: album?.artist,
      releaseDate: releaseDate,
      coverUrl: album?.image,
    })
    setIsSaved(true)
  }

  const year = album?.releaseDate.substring(7, 11)
  const month = album?.releaseDate.substring(3, 6)
  const day = album?.releaseDate.substring(0, 3)
  const formattedDay = Number(day) < 10 ? day?.substring(1, 2) : day
  const releaseDate = `${month} ${formattedDay}, ${year}`

  const tracks = album?.tracks.map(track => {
    return (
      <li key={`${track.trackNum}`}>
        <>{track.name}</>
      </li>
    )
  })

  const previouslySavedMessage = (
    <div className="saved-message">
      <p>this album is saved in your collection</p>
    </div>
  )

  const articleIndex = album?.article.indexOf("<")
  const formattedArticle = album?.article.substring(0, articleIndex) + "..."

  return (
    <>
      {!isLoading && (
        <>
          <span className="directory">
            <span className="directory__artist" data-cy="directory-artist">
              {album?.artist}
              {/* <Link /> to SearchForm with current artist as query can go here later */}
            </span>
            <span className="directory__album" data-cy="directory-album">
              {" "}
              / {album?.name}
            </span>
          </span>
          <section className="album-section">
            <div className="album-details">
              <h1 className="album-details__name" data-cy="album-name">
                {album?.name}
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
                released on: {releaseDate}
              </p>
              <article
                className="album-details__article"
                data-cy="album-article"
              >
                {formattedArticle}
              </article>
              <p className="album-details__last-link">
                {"view more on "}
                <a href={album?.lastURL} data-cy="album-link">
                  Last.fm
                </a>
              </p>
              <ol
                className="album-details__tracklist"
                data-cy="album-tracklist"
              >
                {tracks}
              </ol>
            </div>
            <div className="cover">
              <div className="cover__mat">
                <img
                  className="cover__mat__img"
                  src={album?.image}
                  data-cy="album-cover"
                />
              </div>
            </div>
          </section>
        </>
      )}
    </>
  )
}

export default AlbumDetails
