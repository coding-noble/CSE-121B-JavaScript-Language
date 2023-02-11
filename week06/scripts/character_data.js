let dataList = []

async function disneyAPI() {
    let response = await fetch("https://api.disneyapi.dev/characters")
    if (response.ok) {
        if (!response.ok) {
            console.log("ERROR: Data Could Not Be Converted!")
        }
        let characters = await response.json();
        dataList = characters.data;
        for (i = 2; i < 50; i++) {
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
        console.log("DATA", dataList)
    } else {
        console.log("ERROR: Data Could Not Be Fetched!")
    }
}

disneyAPI(dataList);