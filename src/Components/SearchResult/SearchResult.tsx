import React from 'react';
import { Link, useParams } from 'react-router-dom';
import './_SearchResult.scss'

type Props = {
  name: string;
  searchName: string;
  id: number;
}

const SearchResult = ({name, searchName, id}: Props) => {



  return (
    <Link to={`/search/${searchName}/${name}`} id={`${id}`}>
      <p className='search-result'>{name}</p>
    </Link>
  )
}

export default SearchResult
