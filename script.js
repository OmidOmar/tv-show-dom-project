//You can edit ALL of the code here
const allEpisodes = getAllEpisodes();
function setup() {
  //makePageForEpisodes(allEpisodes);
  displayAllEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;
}

window.onload = setup;
//add main div
let seriesContainer = document.createElement("div");
seriesContainer.className = "seriesContainer";
document.getElementById("main").appendChild(seriesContainer);

//add select input along its options

let episodesList = document.getElementById("episodesList");
let optOne = document.createElement("option");
optOne.innerText = "~ All Episodes ~";
episodesList.appendChild(optOne);
for (let episode of allEpisodes) {
  let option = document.createElement("option");
  option.id = episode.id;
  option.innerText = `S${("0" + episode.season).slice(-2)}E${(
    "0" + episode.number
  ).slice(-2)} - ${episode.name}`;
  episodesList.appendChild(option);
}
episodesList.addEventListener("change", (e) => {
  let selectedOption = episodesList.options[episodesList.selectedIndex].id;
  let res;
  !selectedOption
    ? (res = allEpisodes)
    : (res = allEpisodes.filter((x) => x.id == selectedOption));

  displayAllEpisodes(res);
});

//Display all episodes
const displayAllEpisodes = (allEpisodes) => {
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

    episodeContainer.appendChild(episodesTittle);
    episodeContainer.appendChild(episodesImage);
    episodeContainer.appendChild(episodesDetails);
    seriesContainer.appendChild(episodeContainer);
  }
  document.getElementById("result").innerText = ` ${allEpisodes.length} / ${
    getAllEpisodes().length
  } `;
};

const searchEpisodes = () => {
  let input = document.getElementById("search").value;
  let filteredEpisodes = allEpisodes.filter((x) => {
    if (
      x.name.toLowerCase().indexOf(input.toLowerCase()) > -1 ||
      x.summary.toLowerCase().indexOf(input.toLowerCase()) > -1
    )
      return x;
  });
  displayAllEpisodes(filteredEpisodes);
};
var input = document.getElementById("search");
input.addEventListener("keydown", searchEpisodes);
