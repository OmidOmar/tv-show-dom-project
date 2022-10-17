////////////////////////////////////////////////////////////////
//You can edit ALL of the code here
//const allEpisodes = getAllEpisodes();
let len;

function setup(cb) {
  //displayAllEpisodes(allEpisodes);
  fetch("https://api.tvmaze.com/shows/82/episodes")
    .then((response) => response.json())
    .then((data) => cb(data))
    .catch((error) => console.error(error));
}
window.onload = setup((data) => displayAllEpisodes(data, data.length));
//add seriesContainer div
let seriesContainer = document.createElement("div");
seriesContainer.className = "seriesContainer";
document.getElementById("main").appendChild(seriesContainer);

//add select input along its options

let episodesList = document.getElementById("episodesList");
let optOne = document.createElement("option");
optOne.innerText = "~ All Episodes ~";
episodesList.appendChild(optOne);
setup((allEpisodes) => {
  for (let episode of allEpisodes) {
    let option = document.createElement("option");
    option.id = episode.id;
    option.innerText = `S${("0" + episode.season).slice(-2)}E${(
      "0" + episode.number
    ).slice(-2)} - ${episode.name}`;
    episodesList.appendChild(option);
  }
});
episodesList.addEventListener("change", (e) => {
  let selectedOption = episodesList.options[episodesList.selectedIndex].id;
  let res;

  setup((allEpisodes) => {
    len = allEpisodes.length;
    !selectedOption
      ? (res = allEpisodes)
      : (res = allEpisodes.filter((x) => x.id == selectedOption));
    displayAllEpisodes(res, len);
  });
});

//Display all episodes
const displayAllEpisodes = (allEpisodes, len) => {
  seriesContainer.innerHTML = "";
  for (let i = 0; i < allEpisodes.length; i++) {
    let episodeContainer = document.createElement("div");
    episodeContainer.className = "episodeContainer";
    let episodesTittle = document.createElement("p");
    episodesTittle.className = "episodesTittle";
    episodesTittle.innerText = `${allEpisodes[i]["name"]} - S${(
      "0" + allEpisodes[i]["season"]
    ).slice(-2)}E${("0" + allEpisodes[i]["number"]).slice(-2)}`;
    let episodesImage = document.createElement("img");
    episodesImage.className = "episodesImage";
    episodesImage.src = allEpisodes[i]["image"]["medium"];
    let episodesDetails = document.createElement("div");
    episodesDetails.className = "episodesDetails";
    episodesDetails.innerHTML = allEpisodes[i]["summary"];

    episodeContainer.append(episodesTittle, episodesImage, episodesDetails);
    seriesContainer.appendChild(episodeContainer);
  }
  document.getElementById(
    "result"
  ).innerText = ` ${allEpisodes.length} / ${len}  `;
};

let input = document.getElementById("search");
const searchEpisodes = () => {
  setup((allEpisodes) => {
    len = allEpisodes.length;
    let filteredEpisodes = allEpisodes.filter((x) => {
      if (
        x.name.toLowerCase().indexOf(input.value.toLowerCase()) > -1 ||
        x.summary.toLowerCase().indexOf(input.value.toLowerCase()) > -1
      )
        return x;
    });
    displayAllEpisodes(filteredEpisodes, len);
  });
};
input.addEventListener("keydown", searchEpisodes);
