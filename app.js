import { searchDatabase, findAlbumsByArtist, findTracksByAlbum } from "./http.js";

window.addEventListener("load", initApp);

// ========== GLOBAL VARIABLES ========== //
let artists;

async function initApp() {
  console.log("Siden kører.");
  globalEventListeners();
  searchChanged();
}

function globalEventListeners() {
  document.querySelector("#searchSelect").addEventListener("change", searchChanged);
  // NO "keyup" event listener since they all make a fetch request. So we don't want that. Just click the button.
  document.querySelector("#search-btn").addEventListener("click", searchChanged);
}

async function searchChanged() {
  // Get values from the DOM
  const newSearchValue = document.querySelector("#searchBar").value;
  let whereToSearch = document.querySelector("#searchSelect").value;

  // Use the values to find matching results
  const results = await searchDatabase(whereToSearch, newSearchValue);

  // DISCLAIMER: This is a work-around to the limited frontend focus.
  // It checks if we're searching for either artists or albums.
  // If there's only one (1) match, it also fetches either albums for the given artist or tracks for the given album
  // This way we can see the details of one artist or album without any "clicking around" (which we're not allowed to do)
  // It also sets whereToSearch to include two values, so displaySelectedTables shows the correct amount of tables

  if (results.artists && whereToSearch === "artists" && results.artists.length === 1) {
    const idOfArtist = results.artists[0].id;
    whereToSearch = ["artists", "albums"];
    results.albums = await findAlbumsByArtist("albums", idOfArtist);
  } else if (results.albums && results.albums.length === 1 && whereToSearch === "albums") {
    const idOfAlbum = results.albums[0].id;
    whereToSearch = ["albums", "tracks"];
    results.tracks = await findTracksByAlbum("albums", idOfAlbum);
  }
  // console.log("RESULTS:", results);
  displayBasedOnSearch(whereToSearch, results);
}

function displayBasedOnSearch(whereToSearch, results) {
  // Update the information in the relevant tables
  // We have to use many "if"-statements since we don't know whether whereToSearch includes one value or more
  if (whereToSearch === "combined") {
    displayEverything(results);
  } else {
    if (whereToSearch.includes("artists")) {
      displayArtists(results.artists);
    }
    if (whereToSearch.includes("albums")) {
      displayAlbums(results.albums);
    }
    if (whereToSearch.includes("tracks")) {
      // This is a result of the data-structure from our backend... which isn't ideal for this sort of display
      // When searching for a specific album, the track data is an array nested inside the single album... which is also nested inside results.
      // Otherwise it's just an array inside results
      if (results.tracks.tracks) {
        displayTracks(results.tracks.tracks);
      } else {
        displayTracks(results.tracks);
      }
    }
  }
  // Hide all the tables which we don't want to show
  displaySelectedTables(whereToSearch);
}

function displaySelectedTables(tablesToShow) {
  const artistTable = document.querySelector("#artists-table");
  const trackTable = document.querySelector("#tracks-table");
  const albumTable = document.querySelector("#albums-table");

  // Collect the 3 nodes in an array so they are loop-able
  const tableArray = [artistTable, trackTable, albumTable];

  // Use this boolean to decide whether we show or hide every table, depending on the value of tablesToShow
  const boolCheck = tablesToShow === "combined" ? false : true;

  // Applay the boolean to the .hidden value.
  tableArray.forEach((table) => (table.hidden = boolCheck));

  // If tablesToShow == combined we wish to show every table anyway, so the following code is redundant.
  // Otherwise use it to revert .hidden on the desired albums
  if (tablesToShow !== "combined") {
    // If tablesToShow.length == 2 then it's an array. If so, loop through the entries.
    // Otherwise tablesToShow will be a string, which we can't loop over (without it messing up). So we dont loop.
    if (tablesToShow.length === 2)
      for (const table of tablesToShow) {
        document.querySelector(`#${table}-table`).hidden = false;
      }
    else {
      document.querySelector(`#${tablesToShow}-table`).hidden = false;
    }
  }
}

function displayEverything(fullDataArray) {
  displayAlbums(fullDataArray.albums);
  displayTracks(fullDataArray.tracks);
  displayArtists(fullDataArray.artists);
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
