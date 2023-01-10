export interface AlbumInterface {
  name: string
  artist: string
  image: string
  tracks: [Track]
  releaseDate: string
  article: string
  lastURL: string
}

interface Track {
  name: string
  duration: number
  trackNum: number
  artist: string
  album: string
}

export interface FetchedTrack {
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

export interface FetchAlbumsDatum {
  artist: {name: string},
  name: string, 
  image: [{size: string, '#text': string}, {size: string, '#text': string}, {size: string, '#text': string}, {size: string, '#text': string}]
}

export interface  FetchArtistsDatum {
  name: string
}
export interface SavedAlbum {
  artist: string
  name: string
  picURL: string
}

export interface SearchedAlbumsState {
  artist: string
  name: string
  picURL: string
}