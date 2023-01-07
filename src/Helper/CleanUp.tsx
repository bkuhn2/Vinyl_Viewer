import { FetchAlbumsDatum, SearchedAlbumsState } from "../interfaces"
import record from '../Images/recordplaceholder.png'

const formatURLString = (item: string) => {
    return item.toLowerCase()
      .replaceAll(' ', '+')
      .replace(/\//g, "+")
  }

const formatSearchedAlbums = (albumsData: FetchAlbumsDatum[]) => {

  return removeEmptyAlbumName(albumsData).map((datum: FetchAlbumsDatum) => {
    if (datum.image[3]['#text'] === '') {
      return {
        artist: datum.artist.name,
        name: datum.name, 
        picURL: record
      }
    } else {
      return {
        artist: datum.artist.name,
        name: datum.name, 
        picURL: datum.image[3]['#text']
      }
    }
  })
}


const removeEmptyAlbumName = (rawAlbums: FetchAlbumsDatum[]) => {
  return rawAlbums.filter(album => {
    console.log(album.name);
    
    return !(album.name === "null" || album.name === "(null)" || album.name === "" || album.name === null)
  })
}
  
  export { formatURLString,  formatSearchedAlbums, removeEmptyAlbumName }