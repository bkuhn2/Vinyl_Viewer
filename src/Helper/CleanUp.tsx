import React from "react";

const formatURLString = (item: string) => {
    const lowerCaseItem = item.toLowerCase()
    const spaceToPlus = lowerCaseItem.replaceAll(' ', '+')
    return spaceToPlus
  }
  
  export default formatURLString