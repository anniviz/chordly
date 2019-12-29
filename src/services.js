export function getSongs() {
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

export function getSetlists() {
  return fetch('/setlists').then(res => res.json())
}

export function postSetlist(setlist) {
  return fetch('/setlist', {
    method: 'POST',
    body: JSON.stringify(setlist),
    headers: {
      'content-type': 'application/json',
    },
  }).then(res => res.json())
}

export function patchSetlist(setlist) {
  return fetch('/setlists/' + setlist._id, {
    method: 'PATCH',
    body: JSON.stringify(setlist),
    headers: {
      'content-type': 'application/json',
    },
  }).then(res => res.json())
}
