let allShows = "http://api.tvmaze.com/shows";
let seriesContainer = document.createElement("div");
let selectShow = document.getElementById("select-show");
let selectEpisodes = document.getElementById("episodeList");
let showWindow = document.getElementById("show");
let main = document.getElementById("main");
let showID;

function setup(api, callBack) {
  fetch(api)
    .then((response) => response.json())
    .then((data) => callBack(data))
    .catch((error) => console.log(error));
}

// ////////////////////////////////////////////////////////////////
// //You can edit ALL of the code here
// //const allEpisodes = getAllEpisodes();
// let len;

// function setup(cb) {
//   //displayAllEpisodes(allEpisodes);
//   fetch("https://api.tvmaze.com/shows/82/episodes")
//     .then((response) => response.json())
//     .then((data) => cb(data))
//     .catch((error) => console.error(error));
// }
// window.onload = setup((data) => displayAllEpisodes(data, data.length));
// //add seriesContainer div

seriesContainer.className = "seriesContainer";
document.getElementById("main").appendChild(seriesContainer);

const addItems = (element, allData, isShowSelected, firstOption) => {
  let option = document.createElement("option");
  if (firstOption != null) {
    option.innerText = firstOption;
    element.appendChild(option);
  }

  for (let data of sortObject(allData)) {
    option = document.createElement("option");
    option.id = data.id;
    !isShowSelected
      ? (option.innerText = data.name)
      : (option.innerText = `S${("0" + data.season).slice(-2)}E${(
          "0" + data.number
        ).slice(-2)} - ${data.name}`);
    element.appendChild(option);
  }
};
selectShow.addEventListener("change", () => {
  showID = selectShow.options[selectShow.selectedIndex].id;
  if (showID) {
    setup(allShows + `/${showID}/episodes`, (episodes) => {
      selectEpisodes.innerText = "";
      addItems(selectEpisodes, sortObject(episodes), false, "~ All Episodes ~");
      displayAllEpisodes(sortObject(episodes), episodes.length);
    });
  } else {
    setup(allShows, (show) => {
      displayAllEpisodes(sortObject(show), show.length);
      selectEpisodes.innerText = "";
      let option = document.createElement("option");
      option.innerText = "~ Select Episodes ~";
      selectEpisodes.appendChild(option);
    });
  }
});
selectEpisodes.addEventListener("change", () => {
  let selectedID = selectEpisodes.options[selectEpisodes.selectedIndex].id;
  main.style.visibility = "hidden";
  showWindow.style.display = "block";
  setup(allShows + `/${showID}/episodes`, (episodes) => {
    let episode = episodes.filter((x) => x.id == selectedID);
    console.log(episode[0].image.original);
    showWindow.style.backgroundImage = `url(${episode[0].image.original})`;
    document.querySelector("#title h1").innerText = episode[0].name;
    document.querySelector("#details").innerHTML = episode[0].summary;
    console.log(episode[0]);
  });
});

// //add select input along its options

// let episodesList = document.getElementById("episodesList");
// let optOne = document.createElement("option");
// optOne.innerText = "~ All Episodes ~";
// episodesList.appendChild(optOne);
// setup((allEpisodes) => {
//   for (let episode of allEpisodes) {
//     let option = document.createElement("option");
//     option.id = episode.id;
//     option.innerText = `S${("0" + episode.season).slice(-2)}E${(
//       "0" + episode.number
//     ).slice(-2)} - ${episode.name}`;
//     episodesList.appendChild(option);
//   }
// });
// episodesList.addEventListener("change", (e) => {
//   let selectedOption = episodesList.options[episodesList.selectedIndex].id;
//   let res;

//   setup((allEpisodes) => {
//     len = allEpisodes.length;
//     !selectedOption
//       ? (res = allEpisodes)
//       : (res = allEpisodes.filter((x) => x.id == selectedOption));
//     displayAllEpisodes(res, len);
//   });
// });

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
    if (allEpisodes[i].image)
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

// let input = document.getElementById("search");
// const searchEpisodes = () => {
//   setup((allEpisodes) => {
//     len = allEpisodes.length;
//     let filteredEpisodes = allEpisodes.filter((x) => {
//       if (
//         x.name.toLowerCase().indexOf(input.value.toLowerCase()) > -1 ||
//         x.summary.toLowerCase().indexOf(input.value.toLowerCase()) > -1
//       )
//         return x;
//     });
//     displayAllEpisodes(filteredEpisodes, len);
//   });
// };
// input.addEventListener("keydown", searchEpisodes);

const sortObject = (object) => {
  return object.sort((a, b) =>
    a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
  );
};

const closeShowWindow = () => {
  showWindow.style.display = "none";
  main.style.visibility = "visible";
};

window.onload = setup(allShows, (show) => {
  addItems(selectShow, sortObject(show), false, "~ All Shows ~");
  displayAllEpisodes(sortObject(show), show.length);
});
