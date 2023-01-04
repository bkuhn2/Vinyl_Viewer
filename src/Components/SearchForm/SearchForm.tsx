import React, { useState } from 'react'

const SearchForm = () => {

  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div>
      <h1>Explore</h1>
      <form>
        <input type='text' placeholder='Search for your favorite artists' value={searchTerm}/>
        <button>Search</button>
      </form>
    </div>
  )
}

export default SearchForm
