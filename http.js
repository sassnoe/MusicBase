import { secondsToMinutesAndSeconds } from "./helpers.js";

// const endpoint = `https://codequest-node.azurewebsites.net/`;

const port = 3333;
const endpoint = `http://localhost:${port}`;

async function searchDatabase(whereToSearch, searchValue) {
  const response = await fetch(`${endpoint}/${whereToSearch}/search?q=${searchValue}`);
  const tracksData = await response.json();

  if (tracksData.tracks) {
    for (const track of tracksData.tracks) {
      track.durationSeconds = secondsToMinutesAndSeconds(track.durationSeconds);
    }
  }
  return tracksData;
}

async function findAlbumsByArtist(whereToSearch, searchID) {
  const response = await fetch(`${endpoint}/${whereToSearch}/search/${searchID}`);
  return await response.json();
}

async function findTracksByAlbum(whereToSearch, searchID) {
  const response = await fetch(`${endpoint}/${whereToSearch}/${searchID}`);
  const tracksData = await response.json();
  for (const track of tracksData.tracks) {
    track.durationSeconds = secondsToMinutesAndSeconds(track.durationSeconds);
  }
  return tracksData;
}

export { searchDatabase, findAlbumsByArtist, findTracksByAlbum };

// // ----- Fetches artists ----- //
// async function readArtists() {
//   const response = await fetch(`${endpoint}/artists`);
//   const artistsData = await response.json();
//   console.log(artistsData);
//   return artistsData;
// }

// // ---- Fetches tracks ------ //
// async function readTracks() {
//   const response = await fetch(`${endpoint}/tracks`);
//   const tracksData = await response.json();
//   for (const track of tracksData) {
//     track.durationSeconds = secondsToMinutesAndSeconds(track.durationSeconds);
//   }
//   // const PROPER = secondsToMinutesAndSeconds(tracksData)
//   return tracksData;
// }

// // ---- Fetches a specific track ------ //
// async function readOneTrack() {
//   const response = await fetch(`${endpoint}/tracks${id}`);
//   const tracksData = await response.json();
//   return tracksData;
// }

// // ----- Fetches albums ---- //
// async function readAlbums() {
//   const response = await fetch(`${endpoint}/albums`);
//   const albumsData = await response.json();
//   return albumsData;
// }

// ----- Searches for value ---- //
