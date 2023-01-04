import React from 'react';
import { Link } from 'react-router-dom';
import './_SearchResult.scss'

type Props = {
  name: string;
}

const SearchResult = ({name}: Props) => {
  return (
    <Link to={`/search/${name}/albums`}>
      <p className='search-result'>{name}</p>
    </Link>
  )
}

export default SearchResult
