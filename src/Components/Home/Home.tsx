import React from 'react'
import './_Home.scss'
import { Link } from "react-router-dom";

const Home = () => {
  return (
      <div className="split-screen">
        <h1 className="split-screen__title">Vinyl Viewer</h1>
        <Link className="artist-search split" to={`/search`}>
            <h2>Search Artists</h2>
        </Link>

        <Link className="user-collection split" to={`/my-collection`}>
            <h2>My Collection</h2>
        </Link>
      </div>
  )
}

export default Home
