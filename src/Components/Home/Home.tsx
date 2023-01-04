import React from 'react'
import './_Home.scss'
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="split-screen">
      <Link className="artist-search split" to={`/search`}>
        <div >
          <h1>Search Artists</h1>
        </div>
      </Link>

      <div className="user-collection split">
        <h1>My Collection</h1>
      </div>
    </div>
  )
}

export default Home
