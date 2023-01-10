import '../SearchError/_SearchError.scss'

type Props = {
  errorMessage: string;
}

const SearchError = ({ errorMessage } : Props) => {
  return (
    <div className='search-error-area'>
      <h3 className='search-error-message'>{errorMessage}</h3>
    </div>
  )
}

export default SearchError;