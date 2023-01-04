import React from 'react'
import './_Home.scss'
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="split-screen">
      <Link className="artist-search split" to={`/search`}>
          <h1>Search Artists</h1>
      </Link>

      <Link className="user-collection split" to={`/my-collection`}>
          <h1>My Collection</h1>
      </Link>
    </div>
  )
}

export default Home
