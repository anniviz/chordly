export function getSongIndex(songs, setlistSong) {
  return songs.findIndex(song => song._id === setlistSong._id)
}
