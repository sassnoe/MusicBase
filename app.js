import { readArtists, readTracks, readOneTrack, readAlbums, searchDatabase } from "./http.js";

window.addEventListener("load", initApp);

// ========== GLOBAL VARIABLES ========== //
let artists;

async function initApp(params) {
  console.log("Siden kører.");
  globalEventListeners();
  const allData = await readEverything();
  displayEverything(allData);

  // displayArtists(artists);
}

async function readEverything(params) {
  const artists = await readArtists();
  const albums = await readAlbums();
  const tracks = await readTracks();
  console.log(artists, albums, tracks);
  return { artists: artists, albums: albums, tracks: tracks };
}

function displayEverything(fullDataArray) {
  displayAlbums(fullDataArray.albums);
  displayTracks(fullDataArray.tracks);
  displayArtists(fullDataArray.artists);
}

function globalEventListeners() {
  // document.querySelector("#searchForm").addEventListener("keyup",searchChanged)
  document.querySelector("#searchSelect").addEventListener("change", searchChanged);
  document.querySelector("#searchBar").addEventListener("keyup", searchChanged);
  document.querySelector("#searchBar").addEventListener("search", searchChanged);
}

async function searchChanged() {
  const searchValue = document.querySelector("#searchBar").value;
  const whereToSearch = document.querySelector("#searchSelect").value;
  console.log("Searchvalue:", searchValue);
  console.log("whereToSearch:", whereToSearch);
  const results = await searchDatabase(whereToSearch, searchValue);
  console.log(results);
}

function displayArtists(artistList) {
  const table = document.querySelector("#artists-data");
  table.innerHTML = "";

  for (const artist of artistList) {
    table.insertAdjacentHTML(
      "beforeend",
      /* HTML */ `
        <tr>
          <td>${artist.name}</td>
          <td>${artist.birthdate}</td>
        </tr>
      `
    );
  }
}
function displayTracks(trackList) {
  const table = document.querySelector("#tracks-data");
  table.innerHTML = "";

  for (const track of trackList) {
    table.insertAdjacentHTML(
      "beforeend",
      /* HTML */ `
        <tr>
          <td>${track.title}</td>
          <td>${track.durationSeconds}</td>
        </tr>
      `
    );
  }
}
function displayAlbums(albumList) {
  // const table = document.querySelector("#albums-table");
  // table.innerHTML = "";

  for (const album of albumList) {
    document.querySelector("#albums-data").insertAdjacentHTML(
      "beforeend",
      /* HTML */ `
        <tr>
          <td>${album.title}</td>
          <td>${album.releaseYear}</td>
        </tr>
      `
    );
  }
}
