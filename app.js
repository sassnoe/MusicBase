import {
  readArtists,
  readTracks,
  readOneTrack,
  readAlbums,
  searchDatabase,
} from "./http.js";

window.addEventListener("load", initApp);

// ========== GLOBAL VARIABLES ========== //
let artists;

async function initApp(params) {
  console.log("Siden kører.");
  globalEventListeners();
  const allData = await readEverything();
  displayEverything(allData);
}

function globalEventListeners() {
  document
    .querySelector("#searchSelect")
    .addEventListener("change", searchChanged);
  document.querySelector("#searchBar").addEventListener("keyup", searchChanged);
  document
    .querySelector("#searchBar")
    .addEventListener("search", searchChanged);
  // document.querySelector("#btn-all").addEventListener("click", changeView);
  // document.querySelector("#btn-artists").addEventListener("click", changeView);
  // document.querySelector("#btn-albums").addEventListener("click", changeView);
  // document.querySelector("#btn-tracks").addEventListener("click", changeView);
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

function displaySelectedTables(tableToShow) {
  console.log(tableToShow);
  const artistTable = document.querySelector("#artists-table");
  const trackTable = document.querySelector("#tracks-table");
  const albumTable = document.querySelector("#albums-table");

  const tableArray = [artistTable, trackTable, albumTable];
  let boolCheck = true;

  if (tableToShow === "combined") {
    boolCheck = false;
  }

  for (const table of tableArray) {
    table.hidden = boolCheck;
  }

  if (tableToShow !== "combined") {
    document.querySelector(`#${tableToShow}-table`).hidden = false;
  }
}

// function changeView(event) {
//   console.log(event.target.value);
//   const viewToShow = event.target.value;
//   displaySelectedTables(viewToShow);
// }

async function searchChanged() {
  const searchValue = document.querySelector("#searchBar").value;
  const whereToSearch = document.querySelector("#searchSelect").value;
  console.log("Searchvalue:", searchValue);
  console.log("whereToSearch:", whereToSearch);
  const results = await searchDatabase(whereToSearch, searchValue);
  const test2 = "tracks";
  const test = `display${test2}`;
  console.log(results);
  if (whereToSearch === "combined") {
    displayEverything(results);
  } else if (whereToSearch === "artists") {
    displayArtists(results);
  } else if (whereToSearch === "albums") {
    displayAlbums(results);
  } else if (whereToSearch === "tracks") {
    displayTracks(results);
  }
  displaySelectedTables(whereToSearch);
}

function displayArtists(artistList) {
  const table = document.querySelector("#artists-data");
  table.innerHTML = "";

  if (artistList.length === 0) {
    table.innerHTML = "No Artists Found";
  } else {
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
}
function displayTracks(trackList) {
  const table = document.querySelector("#tracks-data");
  table.innerHTML = "";

  if (trackList.length === 0) {
    table.innerHTML = "No Tracks Found";
  } else {
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
}
function displayAlbums(albumList) {
  const table = document.querySelector("#albums-data");
  table.innerHTML = "";

  if (albumList.length === 0) {
    table.innerHTML = "No albums found";
  } else {
    console.log("else");
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
}
