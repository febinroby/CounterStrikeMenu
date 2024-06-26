// Necessary URLS for API call
const AGENTS_URL = "https://bymykel.github.io/CSGO-API/api/en/agents.json";
const SKINS_URL = "https://bymykel.github.io/CSGO-API/api/en/skins.json";

// Variables to store necessary data
let counterTerrorists = [];
let terrorists = [];
let weapons = [];

// Classes to outline data
class Agent {
    constructor(id, name, image, team, description) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.team = team;
        this.description = description;
    }
}

class Weapon {
    constructor(id, name, image, skin, category, team, description) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.skin = skin;
        this.category = category;
        this.team = team;
        this.description = description;
    }

    setPrice() {
        if(this.category === "Pistols") {
            let randomPrice = Math.round((Math.random() * (700 - 200) + 200) / 50) * 50;
            this.price = randomPrice;
        } else if(this.category === "SMGs") {
            let randomPrice = Math.round((Math.random() * (1500 - 1000) + 1000) / 50) * 50;
            this.price = randomPrice;
        } else if(this.category === "Rifles") {
            let randomPrice = Math.round((Math.random() * (3500 - 1500) + 1500) / 50) * 50;
            this.price = randomPrice;
        } else if(this.category === "Heavy") {
            let randomPrice = Math.round((Math.random() * (4500 - 2500) + 2500) / 50) * 50;
            this.price = randomPrice;
        } else if(this.category === "Knives") {
            let randomPrice = Math.round((Math.random() * (500 - 100) + 100) / 50) * 50;
            this.price = randomPrice;
        } else if(this.category === "Gloves") {
            let randomPrice = Math.round((Math.random() * (500 - 100) + 100) / 50) * 50;
            this.price = randomPrice;
        }
    }
}

// Fetching Data from the API
function getData(url) {
    let apiRequest = $.getJSON(url, function() {
        console.log("Successfully retrieved data!");
    })
    .done(function(apiResponse) {
        if(url === AGENTS_URL) {
            for(let i=0; i<apiResponse.length; i++) {
                const newAgent = new Agent(apiResponse[i].id, apiResponse[i].name, apiResponse[i].image, apiResponse[i].team.name, apiResponse[i].description);
                if(newAgent.team === "Terrorist") {
                    terrorists.push(newAgent);
                } else if(newAgent.team === "Counter-Terrorist") {
                    counterTerrorists.push(newAgent);
                }
            }
        } else if(url === SKINS_URL) {
            for(let i=0; i<apiResponse.length; i++) {
                if(apiResponse[i].weapon === null || apiResponse[i].pattern === null || apiResponse[i].category === null) {
                    continue;
                } else {
                    const newWeapon = new Weapon(apiResponse[i].id, apiResponse[i].weapon.name, apiResponse[i].image, apiResponse[i].pattern.name, apiResponse[i].category.name, apiResponse[i].team.id, apiResponse[i].description);
                    newWeapon.setPrice();
                    weapons.push(newWeapon);
                }
            }
        }
    })
    .fail(function() {
        console.log("Failed to retrieve data!");
    });
}

getData(AGENTS_URL);
getData(SKINS_URL);