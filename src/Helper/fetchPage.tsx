export const fetchPage = async (url: string): Promise<AlbumInterface> => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(url)
      if (response.ok) {
        const {album} = await response.json()
        resolve ({
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
    } catch (error) {
      console.log("in fetch page", error)
      reject(error)
    }
  })
}

export interface AlbumInterface {
  name: string
  artist: string
  image: string
  tracks: [Track]
  releaseDate: string
  article: string
  lastURL: string
}

export interface Track {
  name: string
  duration: number
  trackNum: number
  artist: string
  album: string
}

interface FetchedTrack {
  "@attr": {
    rank: string
  }
  artist: {
    url: string
    name: string
    mbid: string
  }
  duration: number
  name: string
  streamable: {
    fulltrack: string
    "#text": string
  }
  url: string
}
