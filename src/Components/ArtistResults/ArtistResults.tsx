import React from 'react'
import '../ArtistResults/_ArtistResults.scss'

type Props = {
  name: string;
  results: Array<object>;
}

const ArtistResults = ({name, results}: Props) => {
  return (
    <section className='artist-results-section'>
      <h2>Results for "{name}"</h2>
      <div>

      </div>
    </section>
  )
}

export default ArtistResults
