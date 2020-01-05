export default function findFuzzyMatch(songTitle, searchInput) {
  let search = searchInput.replace(/ /g, '').toLowerCase()
  let name = songTitle.replace(/ /g, '').toLowerCase()
  const tokens = name.split('')
  let search_position = 0

  tokens.forEach(i => {
    if (i === search[search_position]) {
      search_position += 1
      if (search_position >= search.length) {
        return false
      }
    }
  })

  if (search_position !== search.length) {
    return ''
  }
  return tokens.join('')
}
