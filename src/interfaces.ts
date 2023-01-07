


export interface FetchAlbumsDatum {
  artist: {name: string},
  name: string, 
  image: [{size: string, '#text': string}, {size: string, '#text': string}, {size: string, '#text': string}, {size: string, '#text': string}]
}

export interface  FetchArtistsDatum {
  name: string
}