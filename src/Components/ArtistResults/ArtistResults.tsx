import React from 'react'
import '../ArtistResults/_ArtistResults.scss';
import SearchResult from '../SearchResult/SearchResult';

type Props = {
  name: string;
  results: Array<string>;
}

const ArtistResults = ({name, results}: Props) => {

  const artistsList = results.map(result => {
    return (
      <SearchResult name={result}/>
    )
  })

  return (
    <section className='artist-results-section'>
      <h2>Results for "{name}"</h2>
      <div>
        {artistsList}
      </div>
    </section>
  )
}

export default ArtistResults
