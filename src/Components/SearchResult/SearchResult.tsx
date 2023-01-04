import React from 'react';
import { Link, useParams } from 'react-router-dom';
import './_SearchResult.scss'

type Props = {
  name: string;
  searchName: string;
}

const SearchResult = ({name, searchName}: Props) => {



  return (
    <Link to={`/search/${searchName}/${name}`}>
      <p className='search-result'>{name}</p>
    </Link>
  )
}

export default SearchResult
