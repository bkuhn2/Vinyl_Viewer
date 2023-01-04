import React from 'react';
import './_SearchResult.scss'

type Props = {
  name: string;
}

const SearchResult = ({name}: Props) => {
  return (
    <div className='search-result'>
      <p>{name}</p>
    </div>
  )
}

export default SearchResult
