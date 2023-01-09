import React from "react"

const fetchData = (url: string) => {
  return fetch(url).then(response => {
    if (response.ok) {
      return response.json()
    } else {
      throw new Error('bad response')
    }
  })
}

export default fetchData