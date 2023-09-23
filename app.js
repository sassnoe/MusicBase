import { readArtists, readTracks, readOneTrack, readAlbums, searchDatabase, findAlbumsByArtist, findTracksByAlbum } from "./http.js";

window.addEventListener("load", initApp);

// ========== GLOBAL VARIABLES ========== //
let artists;

async function initApp(params) {
  console.log("Siden kører.");
  globalEventListeners();
  // const allData = await readEverything();
  // searchChanged(allData);
  searchChanged();
}

function globalEventListeners() {
  document.querySelector("#searchSelect").addEventListener("change", searchChanged);
  document.querySelector("#searchBar").addEventListener("keyup", searchChanged);
  document.querySelector("#searchBar").addEventListener("search", searchChanged);
}

// async function readEverything(params) {
//   const artists = await readArtists();
//   const albums = await readAlbums();
//   const tracks = await readTracks();
//   console.log(artists, albums, tracks);
//   return { artists: artists, albums: albums, tracks: tracks };
// }

async function searchChanged() {
  const searchValue = document.querySelector("#searchBar").value;
  let whereToSearch = document.querySelector("#searchSelect").value;
  // console.log("Searchvalue:", searchValue);
  // console.log("whereToSearch:", whereToSearch);
  let results = await searchDatabase(whereToSearch, searchValue);

  // console.log("RESULTS:", results);
  // console.log("entries:", results.artists.length);
  // console.log("values:", results.values);
  // console.log("where to search:", whereToSearch);
  if (results.artists && whereToSearch === "artists" && results.artists.length === 1) {
    const idOfArtist = results.artists[0].id;
    console.log("ARTIST ID:", idOfArtist);
    whereToSearch = ["artists", "albums"];
    results.albums = await findAlbumsByArtist("albums", idOfArtist);
  } else if (results.albums.length === 1 && whereToSearch === "albums") {
    const idOfAlbum = results.albums[0].id;
    whereToSearch = ["albums", "tracks"];
    results.tracks = await findTracksByAlbum("albums", idOfAlbum);
  }

  console.log("RESULTS:", results);

  // console.log("WHERE TO SEARCH:", whereToSearch);

  displayBasedOnSearch(whereToSearch, results);
}

function displayEverything(fullDataArray) {
  displayAlbums(fullDataArray.albums);
  displayTracks(fullDataArray.tracks);
  displayArtists(fullDataArray.artists);
}

function displaySelectedTables(tablesToSHow) {
  const artistTable = document.querySelector("#artists-table");
  const trackTable = document.querySelector("#tracks-table");
  const albumTable = document.querySelector("#albums-table");

  const tableArray = [artistTable, trackTable, albumTable];
  let boolCheck = true;

  if (tablesToSHow === "combined") {
    boolCheck = false;
  }

  for (const table of tableArray) {
    table.hidden = boolCheck;
  }

  if (tablesToSHow !== "combined") {
    // If there's two tables, "un-hide" both, otherwise unhide only one
    if (tablesToSHow.length === 2)
      for (const table of tablesToSHow) {
        document.querySelector(`#${table}-table`).hidden = false;
      }
    else {
      document.querySelector(`#${tablesToSHow}-table`).hidden = false;
    }
  }
}

function displayBasedOnSearch(whereToSearch, results) {
  if (whereToSearch === "combined") {
    displayEverything(results);
  } else if (whereToSearch.includes("artists")) {
    displayArtists(results.artists);
  }
  if (whereToSearch.includes("albums")) {
    displayAlbums(results.albums);
  }
  if (whereToSearch.includes("tracks")) {
    if (results.tracks.tracks) {
      displayTracks(results.tracks.tracks);
    } else {
      displayTracks(results.tracks);
    }
  }
  displaySelectedTables(whereToSearch);
}

function displayArtists(artistList) {
  const table = document.querySelector("#artists-data");
  table.innerHTML = "";

  if (artistList.length === 0) {
    table.innerHTML = "No artists found";
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
    table.innerHTML = "No tracks found";
  } else {
    for (const track of trackList) {
      table.insertAdjacentHTML(
        "beforeend",
        /* HTML */ `
          <tr>
            <td>${track.title}</td>
            <td>${track.artistName}</td>
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
    for (const album of albumList) {
      document.querySelector("#albums-data").insertAdjacentHTML(
        "beforeend",
        /* HTML */ `
          <tr>
            <td>${album.title}</td>
            <td>${album.artistName}</td>
            <td>${album.releaseYear}</td>
          </tr>
        `
      );
    }
  }
}
