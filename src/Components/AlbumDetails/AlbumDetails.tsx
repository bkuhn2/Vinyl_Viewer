import { FC, useEffect } from "react"
import { Link, useParams } from "react-router-dom"

import ghTemp from "../../assets/gh-cover-temp.jpeg"
import fetchPage from "../../Helper/fetchPage"

interface ADProps {
  addToCollection: Function;
}

const AlbumDetails: FC<ADProps> = ({ addToCollection }) => {
  // const { artist, album } = useParams()

  useEffect(() => {
    getPage()
  }, [])

  const getPage = async () => {
    const data = await fetchPage("http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=fcf48a134034bb684aa87d0e0309a0fd&artist=Cher&album=Believe&format=json")
    console.log(data)
  }

  return (
    <div>
      
    </div>
  )
}

export default AlbumDetails
