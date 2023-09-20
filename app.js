"use strict";

import { readArtists, readTracks, readAlbums } from "./http.js";

window.addEventListener("load", initApp);

// ========== GLOBAL VARIABLES ========== //
let artists;

function initApp(params) {
  console.log("Siden kører.");
  globalEventListeners();

  displayArtists(artists);
}

function globalEventListeners() {}

function displayArtists(artistList) {
  document.querySelector("#grid-container").innerHTML = "";
  for (const artist of artistList) {
    document.querySelector("#grid-container").insertAdjacentHTML(
      "beforeend",
      /* HTML */ `
        <article>
          <img src="${artist.img}" />
          <p></p>
        </article>
      `
    );
  }
}
