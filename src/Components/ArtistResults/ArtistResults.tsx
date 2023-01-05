import React from 'react'
import '../ArtistResults/_ArtistResults.scss';
import SearchResult from '../SearchResult/SearchResult';

type Props = {
  searchName: string;
  results: Array<string>;
}

const ArtistResults = ({results, searchName}: Props) => {

  const artistsList = results.map((result, index) => {
    return (
      <SearchResult name={result} searchName={searchName} key={index}/>
    )
  })

  return (
    <section className='artist-results-section'>
      <h2>Results for "{searchName}"</h2>
      <div>
        {artistsList}
      </div>
    </section>
  )
}

export default ArtistResults
