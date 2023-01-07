const formatURLString = (item: string) => {
    return item.toLowerCase()
      .replaceAll(' ', '+')
      .replace(/\//g, "+")
  }
  
  export default formatURLString