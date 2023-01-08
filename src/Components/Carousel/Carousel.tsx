import React, { useState } from 'react'
import './_Carousel.scss'
import { formatURLString } from '../../Helper/CleanUp'
import { Link } from 'react-router-dom'


// type Props = {
//     album: {
//       artist: string,
//       name: string, 
//       picURL: string
//     },
//     children: JSX.Element,
//     width: string,
//     index: number
// }

export const CarouselItem = ({ children, width, item }) => {
  return (
      <div className="carousel-item" style={{ width: width }}>
          {children}
          <h2>{item.name}</h2>
          <div
              className="color"
              style={{
                  backgroundColor: `blue`
                }}
          ></div>
      </div>
  )
}

const Carousel = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  console.log(children)
  const updateIndex = (newIndex) => {
      if (newIndex < 0) {
          newIndex = React.Children.count(children) - 1
      } 
      else if (newIndex >= React.Children.count(children)) {
          
          newIndex = 0
      }

      setActiveIndex(newIndex)
  }

  return (
      <div className="carousel">
          <div className="inner" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
              {React.Children.map(children, (child, index) => {
                  return React.cloneElement(child, {width: "100%" })
              })}
          </div>
          <div className="indicators">
              <button 
                  onClick={() => {
                      updateIndex(activeIndex - 1)
                  }}
                  >
                      {'<'}
              </button>
              <button 
                  onClick={() => {
                      updateIndex(activeIndex + 1)
                  }}
                  >
                      {'>'}
              </button>
          </div>
      </div>
  )
}

export default Carousel

