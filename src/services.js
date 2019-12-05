export async function getSongs() {
  const res = await fetch('/songs')
  return res.json()
}
