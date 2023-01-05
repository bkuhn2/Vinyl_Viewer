const formatReleaseDate = (date: string) => {
  const year = date.substring(7, 11)
  const month = date.substring(3, 6)
  const day = date.substring(0, 3)
  const formattedDay = Number(day) < 10 ? day?.substring(1, 2) : day
  return `${month} ${formattedDay}, ${year}`
}

export default formatReleaseDate