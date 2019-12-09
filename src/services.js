export async function getSongs() {
  const res = await fetch('/songs')
  return res.json()
}

export function postSong(song) {
  return fetch('/songs', {
    method: 'POST',
    body: JSON.stringify(song),
    headers: {
      'content-type': 'application/json',
    },
  }).then(res => res.json())
}
