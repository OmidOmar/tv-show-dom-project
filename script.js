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
document.body.appendChild(seriesContainer);

//add select input along its options
let episodesList = document.getElementById("episodesList");
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
  let res = allEpisodes.filter((x) => x.id == selectedOption);
  displayAllEpisodes(res);
});

//Display all episodes
const displayAllEpisodes = (allEpisodes) => {
  seriesContainer.innerHTML = "";
  for (let i = 0; i < allEpisodes.length; i++) {
    let episodeContainer = document.createElement("div");
    episodeContainer.className = "episodeContainer";
    let seriesTittle = document.createElement("p");
    seriesTittle.className = "seriesTittle";
    seriesTittle.innerText = `${allEpisodes[i]["name"]} - S${(
      "0" + allEpisodes[i]["season"]
    ).slice(-2)}E${("0" + allEpisodes[i]["number"]).slice(-2)}`;
    let seriesImage = document.createElement("img");
    seriesImage.className = "seriesImage";
    seriesImage.src = allEpisodes[i]["image"]["medium"];
    let seriesDetails = document.createElement("div");
    seriesDetails.className = "seriesDetails";
    seriesDetails.innerHTML = allEpisodes[i]["summary"];

    episodeContainer.appendChild(seriesTittle);
    episodeContainer.appendChild(seriesImage);
    episodeContainer.appendChild(seriesDetails);
    seriesContainer.appendChild(episodeContainer);
  }
  document.getElementById("result").innerText = `${allEpisodes.length}/${
    getAllEpisodes().length
  }`;
};

var input = document.getElementById("search");
input.addEventListener("keydown", function (event) {
  let input = document.getElementById("search").value;
  let filteredEpisodes = allEpisodes.filter((x) => {
    if (
      x.name.toLowerCase().indexOf(input.toLowerCase()) > -1 ||
      x.summary.toLowerCase().indexOf(input.toLowerCase()) > -1
    )
      return x;
  });
  displayAllEpisodes(filteredEpisodes);
});


