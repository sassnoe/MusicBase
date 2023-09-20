const endpoint = "";

// ----- Fetches artists ----- //
async function readArtists() {
  const response = await fetch(`${endpoint}/artists`);
  const artistsData = await response.json();
  return artistsData;
}

// ---- Fetches tracks ------ //
async function readTracks() {
  const response = await fetch(`${endpoint}/tracks`);
  const tracksData = await response.json();
  return tracksData;
}

// // ---- Fetches a specific track ------ //
// async function readTracks() {
//   const response = await fetch(`${endpoint}/tracks${id}`);
//   const tracksData = await response.json();
//   return tracksData;
// }

// ----- Fetches albums ---- //
async function readAlbums() {
  const response = await fetch(`${endpoint}/albums`);
  const albumsData = await response.json();
  return albumsData;
}

export { readArtists, readTracks, readAlbums };
