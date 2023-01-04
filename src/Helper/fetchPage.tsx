const fetchPage = async (url: string): Promise<Album> => {
  const response = await fetch(url)
  const { album } = await response.json()
  return {
    name: album.name,
    artist: album.artist,
    image: album.image[4]["#text"],
    tracks: album.tracks.track.map((track: FetchedTrack) => ({
      name: track.name,
      duration: track.duration,
      trackNum: track["@attr"]["rank"],
      artist: album.artist,
      album: album.name
    })),
    listeners: album.listeners,
    wiki: {
      published: album.wiki.published,
      summary: album.wiki.summary
    }
  }
}

export default fetchPage

interface Album {
  name: string
  artist: string
  image: string
  tracks: [Record<string, Track>]
  listeners: string
  wiki: {
    published: string
    summary: string
  }
}

interface Track {
  name: string
  duration: number
  trackNum: number
  artist: string
  album: string
}

interface FetchedTrack {
  "@attr": { 
    "rank": string 
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
  url: string,
}