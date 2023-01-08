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

export interface FetchAlbumsDatum {
  artist: {name: string},
  name: string, 
  image: [{size: string, '#text': string}, {size: string, '#text': string}, {size: string, '#text': string}, {size: string, '#text': string}]
}

export interface  FetchArtistsDatum {
  name: string
}

export interface SearchedAlbumsState {
  artist: string,
  name: string, 
  picURL: string
}