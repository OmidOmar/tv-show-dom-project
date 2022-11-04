let allShows = "http://api.tvmaze.com/shows";
let main = document.getElementById("main");
let selectShow = document.getElementById("shows-list");
let selectEpisode = document.getElementById("episodes-list");
let showWindow = document.getElementById("show");
let control = document.getElementById("control");
let search = document.getElementById("search");

let showID, len;

const setup = (api, callBack) => {
  fetch(api)
    .then((response) => response.json())
    .then((data) => callBack(data))
    .catch((error) => console.log(error));
};

window.onload = setup(allShows, (shows) => {
  len = shows.length;
  display(shows, true);
  addItems(shows, selectShow, true);
});

const searchEpisodes = () => {
  if (showID) {
    setup(allShows + `/${showID}/episodes`, (allEpisodes) => {
      let filteredEpisodes = allEpisodes.filter((x) => {
        if (
          x.name.toLowerCase().indexOf(search.value.toLowerCase()) > -1 ||
          x.summary.toLowerCase().indexOf(search.value.toLowerCase()) > -1
        )
          return x;
      });
      console.log(filteredEpisodes);
      display(filteredEpisodes, false);
    });
  } else {
    setup(allShows, (allEpisodes) => {
      let filteredEpisodes = allEpisodes.filter((x) => {
        if (
          x.name.toLowerCase().indexOf(search.value.toLowerCase()) > -1 ||
          x.summary.toLowerCase().indexOf(search.value.toLowerCase()) > -1
        )
          return x;
      });
      console.log(filteredEpisodes);
      display(filteredEpisodes, this);
    });
  }
};
search.addEventListener("input", searchEpisodes);

selectEpisode.addEventListener("change", () => {
  let episodeID = selectEpisode.options[selectEpisode.selectedIndex].id;
  if (episodeID) {
    setup(allShows + `/${showID}/episodes`, (episodes) => {
      let episode = episodes.filter((x) => x.id == episodeID);
      showWindow.style.backgroundImage = `url(${episode[0].image.original})`;
      document.querySelector("#title h1").innerText = episode[0].name;
      document.querySelector("#details").innerHTML = episode[0].summary;
      showWindow.style.display = "block";
      control.style.display = "none";
      main.style.visibility = "hidden";
      search.disabled = true;
    });
  }
});

selectShow.addEventListener("change", () => {
  showID = selectShow.options[selectShow.selectedIndex].id;
  if (showID) {
    setup(`${allShows}/${showID}/episodes`, (x) => {
      len = x.length;
      display(x, false);
      selectEpisode.style.display = "flex";
      addItems(x, selectEpisode, false);
    });
  } else {
    setup(allShows, (shows) => {
      len = shows.length;
      display(shows, true);
      selectEpisode.style.display = "none";
      addItems(shows, selectShow, true);
      showID = "";
    });
  }
});

const addItems = (items, list, isShow) => {
  list.innerHTML = "";

  if (isShow) {
    let option = document.createElement("option");
    option.innerText = "~ Show all Serials ~";
    list.append(option);
    for (let item of items) {
      let option = document.createElement("option");
      option.innerText = item.name;
      option.id = item.id;
      list.appendChild(option);
    }
  } else {
    let option = document.createElement("option");
    option.innerText = "~ Show all Episodes ~";
    list.append(option);
    for (let item of items) {
      let option = document.createElement("option");
      option.innerText = `S${("0" + item.season).slice(-2)}E${(
        "0" + item.number
      ).slice(-2)} - ${item.name}`;
      option.id = item.id;
      list.appendChild(option);
    }
  }
};

const display = (objects, isShow) => {
  main.innerHTML = "";
  for (let show of objects) {
    let container = document.createElement("div");
    let title = document.createElement("h4");
    let description = document.createElement("div");
    let details = document.createElement("div");
    let image = document.createElement("img");
    let summary = document.createElement("p");
    let paragraph = document.createElement("p");

    summary.innerHTML = show.summary.replace("<p>", " ").replace("</p>", " ");
    image.src = show.image.medium;

    details.className = "show-details";
    if (isShow) {
      title.innerText = show.name;
      paragraph.innerHTML = `Rated: ${
        show.rating.average
      }<br><br>Genres: ${show.genres
        .toString()
        .replace(",", " | ")}<br><br>Status: ${show.status}<br><br>Runtime: ${
        show.runtime
      }`;
      description.className = "img-show-desc-container"; //"episode-img-show-desc";
      container.className = "show-container";
    } else {
      title.innerText = `${show.name} - S${("0" + show.season).slice(-2)}E${(
        "0" + show.number
      ).slice(-2)}`;
      main.style.display = "flex";
      main.style.flexWrap = "wrap";
      main.style.flexDirection = "row";
      main.style.justifyContent = "center";
      description.className = "episode-img-show-desc";
      container.className = "episode-container";
    }
    details.append(paragraph);
    description.append(image, summary, details);
    container.append(title, description);
    main.append(container);
  }
  document.getElementById("total").innerText = `${objects.length} / ${len}`;
};

const closeShowWindow = () => {
  showWindow.style.display = "none";
  main.style.visibility = "visible";
  control.style.display = "flex";
  search.disabled = false;
};

