import { Link } from 'react-router-dom';
import './_SearchResult.scss'

type Props = {
  name: string;
  searchName: string;
  id: number;
}

const SearchResult = ({name, searchName, id}: Props) => {
  return (
    <Link to={`/search/${searchName}/${name}`} id={`${id}`} className='search-result-container'>
      <p className='search-result'>{name}</p>
    </Link>
  )
}

export default SearchResult;