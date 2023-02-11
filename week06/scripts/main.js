const maxBTN = document.getElementById("maxed");
const clearBTN = document.getElementById("clear");
const increaseBTN = document.getElementById("increase");
const decreaseBTN = document.getElementById("decrease");
const sortingSelector = document.getElementById("sort-by");

const gridElement = document.getElementById("character_grid");
const charCountElement = document.getElementById("char-count");

const origOrder = document.getElementById("orig-selector");

let selecAmount = 2;
let dataList;

function populateGrid(charArrayData) {
    // Clear Grid
    gridElement.innerHTML = ""
    // - Creates an article element for each charicter
    charArrayData.forEach((currentItem) => {
        newArticle = document.createElement("article");

        // - Creates an HTML <h3> element for charicters name
        new_h3 = document.createElement("h3");
        new_h3.textContent = "Name: " + currentItem.name

        // - Creates an HTML <h4> element for where the charicter is from
        from_h4 = document.createElement("h4");
        unkownCounter = 0;
        from_h4.innerHTML = "~ From ~ <br>"

        // Movies
        if (currentItem.films.length !== 0) {
            from_h4.innerHTML += "<br>Movies: <br>"
            currentItem.films.forEach((movie) => {
                from_h4.innerHTML += (movie + "<br>")
            })
        } else unkownCounter += 1

        // Short Films
        if (currentItem.shortFilms.length !== 0) {
            from_h4.innerHTML += "<br>Short Films: <br>"
            currentItem.shortFilms.forEach((film) => {
                from_h4.innerHTML += (film + "<br>")
            })
        } else unkownCounter += 1

        // TV Shows
        if (currentItem.tvShows.length !== 0) {
            from_h4.innerHTML += "<br>TV Shows: <br>"
            currentItem.tvShows.forEach((show) => {
                from_h4.innerHTML += (show + "<br>")
            })
        } else unkownCounter += 1

        // Games
        if (currentItem.videoGames.length !== 0) {
            from_h4.innerHTML += "<br>Video Games: <br>"
            currentItem.videoGames.forEach((game) => {
                from_h4.innerHTML += (game + "<br>")
            })
        } else unkownCounter += 1

        // Park Attraction
        if (currentItem.parkAttractions.length !== 0) {
            from_h4.innerHTML += "<br>Park Attractions: <br>"
            currentItem.parkAttractions.forEach((attraction) => {
                from_h4.innerHTML += (attraction + "<br>")
            })
        } else unkownCounter += 1

        if (unkownCounter === 5) {
            from_h4.innerHTML += "<br>Origens Unknown"
        }

        // - Creates an img <img> element for the charicters photo
        newImg = document.createElement("img");
        newImg.setAttribute("src", currentItem.imageUrl)
        newImg.setAttribute("alt", currentItem.name)

        // - Appends all charicter info to the artical element
        newArticle.appendChild(new_h3)
        newArticle.appendChild(newImg)
        newArticle.appendChild(from_h4)

        // - Adds the artical element to the div with the id of "character_grid"
        gridElement.appendChild(newArticle)
    });
};

async function genCharInfo() {
    if (selecAmount >= 0) {
        let response = await fetch("https://api.disneyapi.dev/characters")
        if (response.ok) {
            let characters = await response.json();
            dataList = characters.data;
            if (selecAmount > 0) {
                for (i = 2; i < selecAmount; i++) {
                    response = await fetch("https://api.disneyapi.dev/characters?page=" + i)
                    if (response.ok) {
                        characters = await response.json();
                        newData = characters.data;
                        dataList = dataList.concat(newData);
                        if (!response.ok) {
                            console.log("ERROR: Data Could Not Be Converted!")
                        }
                    } else {
                        console.log("ERROR: Data Could Not Be Fetched!")
                    }
                }
            }
        } else {
            console.log("ERROR: Data Could Not Be Fetched!")
        }
        charCountElement.textContent = dataList.length;
        populateGrid(dataList)
        console.log(dataList)
    }
}

sortingSelector.addEventListener("change", () => {
    gridElement.innerHTML = ""
    let sortBySelector = sortingSelector.value;
    if (sortBySelector === "orig") {
        populateGrid(dataList)
    } else if (sortBySelector === "ascending") {
        let sortedList = dataList.sort((a, b) => {
            if (a.name > b.name) {
                return 1
            } else if (a.name < b.name) {
                return - 1
            } else return 0
        })
        origOrder.style.display = "none"
        populateGrid(sortedList)
    } else if (sortBySelector === "descending") {
        console.log("SELECTED DECENDING")
        console.log(dataList)
        let sortedList = dataList.sort((a, b) => {
            if (a.name < b.name) {
                return 1
            } else if (a.name > b.name) {
                return - 1
            } else return 0
        })
        origOrder.style.display = "none"
        populateGrid(sortedList)
    } else if (sortBySelector === "by-movie") {
        let sortedList = dataList.sort((a, b) => {
            if (a.films < b.films) {
                return 1
            } else if (a.films > b.films) {
                return - 1
            } else return 0
        })
        origOrder.style.display = "none"
        populateGrid(sortedList)
    }
});

clearBTN.addEventListener("click", () => {
    origOrder.style.display = "inline-block"
    sortingSelector.selectedIndex = "0"
    gridElement.innerHTML = ""
    selecAmount = 2;
    genCharInfo();
});

decreaseBTN.addEventListener("click", () => {
    if (selecAmount !== 2) {
        selecAmount -= 1
        genCharInfo()
    }
});

increaseBTN.addEventListener("click", () => {
    if (selecAmount !== 150) {
        selecAmount += 1
        genCharInfo()
    }
});

maxBTN.addEventListener("click", () => {
    selecAmount = 150
    genCharInfo()
})

genCharInfo();