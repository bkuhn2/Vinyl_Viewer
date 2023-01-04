import React, { useState } from 'react'
import './_UserCollection.scss'


const UserCollection = () => {
  const[myCollection, setCollection] = useState('')
  const[filterCollection, setFilter] = useState('')

  return (
    <main className='my-collection'>
      <div className='form'>
        <input
          type='text'
          placeholder='Search by Album'
          value={filterCollection}
          onChange={event => setFilter(event.target.value)}
        />
      <button>Search</button>
    </div>
    <div className='album-display'>
      
    </div>
    </main>
    
   
  )
}

export default UserCollection
