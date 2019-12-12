export async function getSongs() {
  return fetch('/songs').then(res => res.json())
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
