//You can edit ALL of the code here
const allEpisodes = getAllEpisodes();
function setup() {
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;
}

window.onload = setup;

let seriesContainer = document.createElement("div");
seriesContainer.className = "seriesContainer";
document.body.appendChild(seriesContainer);

const displayAllEpisodes = (allEpisodes) => {
  for (let i = 0; i < allEpisodes.length; i++) {
    let episodeContainer = document.createElement("div");
    episodeContainer.className = "episodeContainer";
    let seriesTittle = document.createElement("p");
    seriesTittle.className = "seriesTittle";
    seriesTittle.innerText = `${allEpisodes[i]["name"]} - S0${allEpisodes[i]["season"]}E0${allEpisodes[i]["number"]}`;
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
};

displayAllEpisodes(allEpisodes);

var input = document.getElementById("search");
input.addEventListener("keypress", function (event) {
  let input = document.getElementById("search").value;
  let filteredEpisodes = allEpisodes.filter((x) => {
    if (
      x.name.toLowerCase().indexOf(input.toLowerCase()) > -1 ||
      x.summary.toLowerCase().indexOf(input.toLowerCase()) > -1
    )
      return x;
  });
  seriesContainer.innerHTML=""
  displayAllEpisodes(filteredEpisodes);
});
