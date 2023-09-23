// const port = 3333;
// const endpoint = `http://localhost:${port}`;
const endpoint = `https://codequest-node.azurewebsites.net/`;

// ----- Fetches artists ----- //
async function readArtists() {
  const response = await fetch(`${endpoint}/artists`);
  const artistsData = await response.json();
  console.log(artistsData);
  return artistsData;
}

// ---- Fetches tracks ------ //
async function readTracks() {
  const response = await fetch(`${endpoint}/tracks`);
  const tracksData = await response.json();
  return tracksData;
}

// ---- Fetches a specific track ------ //
async function readOneTrack() {
  const response = await fetch(`${endpoint}/tracks${id}`);
  const tracksData = await response.json();
  return tracksData;
}

// ----- Fetches albums ---- //
async function readAlbums() {
  const response = await fetch(`${endpoint}/albums`);
  const albumsData = await response.json();
  return albumsData;
}

// ----- Searches for value ---- //
async function searchDatabase(whereToSearch, searchValue) {
  console.log(whereToSearch, searchValue);
  const response = await fetch(
    `${endpoint}/${whereToSearch}/search?q=${searchValue}`
  );
  const tracksData = await response.json();
  console.log(tracksData);
  return tracksData;
}

export { readArtists, readTracks, readOneTrack, readAlbums, searchDatabase };
