import { FetchAlbumsDatum, FetchArtistsDatum, SearchedAlbumsState } from "../interfaces"
import record from '../Images/recordplaceholder.png'

const formatURLString = (item: string) => {
    return item.toLowerCase()
      .replaceAll(' ', '+')
      .replace(/\//g, "+")
  }

const formatSearchedArtists = (artistsData: FetchArtistsDatum[]) => {
  return replaceAmpersand(artistsData.map(datum => datum.name)).filter(name => !(name.includes('/') || name.includes('?')))
}

const replaceAmpersand = (rawData: string[]) => {
  const replacedArtists = rawData.map(name => {
     if (name.includes('&')) {
      const splitName = name.split('');

      const indices = splitName.reduce((indexNums: number[], character, currentIndex) => {
        if (character === '&') {
          indexNums.push(currentIndex)
        }
        return indexNums
      }, []);

      indices.forEach(position => {
        splitName.splice(position, 1, 'and')
      });
      
      return splitName.join('');
    } else {
      return name;
    };
  });

  const cleanedArtists: string[] = [];

  replacedArtists.forEach(artist => {
    if (!cleanedArtists.includes(artist)) {
      cleanedArtists.push(artist)
    };
  });

  return cleanedArtists;
}

const formatSearchedAlbums = (albumsData: FetchAlbumsDatum[]) => {
  return removeEmptyAlbumName(albumsData).map((datum) => {
    if (!datum.image[3]['#text']) {
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
    return !(album.name === "null" || album.name === "(null)" || album.name === "" || album.name === null || album.name.toLowerCase() === 'no title')
  })
}
  
  export { formatURLString,  formatSearchedAlbums, removeEmptyAlbumName, formatSearchedArtists }