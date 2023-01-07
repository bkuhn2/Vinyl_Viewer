import React from "react"

const fetchData = (url: string) => {
  return fetch(url).then(response => {
    if (response.ok) {
      return response.json()
    } else {
      console.log('bad response: ', response);
      
      throw new Error('**record scratch** ....something went wrong')
    }
  })
}

export default fetchData