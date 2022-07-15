import * as rooms from "./firebase/backend.js";

export function $(query) {
    if (query.startsWith("#")) return document.getElementById(query.substring(1));
    if (query.startsWith(".")) return Array.from(document.getElementsByClassName(query.substring(1)));
    return Array.from(document.getElementsByTagName(query));
}

Object.prototype.on = function(string, event) {
    return this.addEventListener(string, event);
}

var roomCode;

$("input").forEach(input => {
    input.on("keyup", event => {
        if (event.key === "Enter") input.blur();
    })
})

// Loops through all navbar tabs and makes them listen for clicks - and set that tab to active when that happens.
$(".tab").forEach(tabToSelect => tabToSelect.on("click", event => {
    $(".tab").forEach(tab => {
        if (tab.classList.contains("selected")) {
            tab.classList.remove("selected");
            tab.classList.add("unselected");
        }
    });

    if (tabToSelect.classList.contains("unselected")) tabToSelect.classList.remove("unselected");
    tabToSelect.classList.add("selected");
}))

function clearScreen() {
    $("#prelobby").style.display = "none";
    $("#lobby").style.display = "none";
    $("#legend-screen").style.display = "none"
    $("#room-tab").style.display = "none";
}

function enterPreLobby() {
    clearScreen();
    $("#prelobby").style.display = "block";
}

function enterLegendScreen() {
    clearScreen();
    $("#legend-screen").style.display = "block";
}
 
export function enterLobby() {
    clearScreen();
    $("#lobby").style.display = "flex";
    $("#room-tab").style.display = "flex";
}

export function leaveLobby() {
    clearScreen();
    $("#prelobby").style.display = "block";
}

// Listen for the "create room" button being clicked
$("#create-room").on("click", event => {
    enterLobby();
    roomCode = rooms.generateRoomCode(6);
    rooms.create(roomCode);
});

$("#legend-tab").on("click", event => {
    enterLegendScreen();
})

$("#join-room-input").on("keyup", event => {
    if (event.key === 'Enter') {
        rooms.join($("#join-room-input").value.toUpperCase());
    }
});

$("#join-room-input").on("input", event => {
    $("#join-room-tooltip-triangle").style.display = "none";
    $("#join-room-tooltip").style.display = "none";
});

$("#join-room-button").on("click", event => {
    $("#join-room-button").style.display = "none";
    $("#join-room-input").style.display = "block";
    $("#join-room-input").focus();
});

$("#join-room-input").on("blur", event => {
    if ($("#join-room-input").value === "") {
        $("#join-room-input").style.display = "none";
        $("#join-room-button").style.display = "block";
    }
});

// Listen to the "name" text box, and when it changes, save the name to "local storage"
$("#profile").on("input", event => {

    // If the text box isn't empty, save the name and set the length of the box to the length of the name
    if ($("#profile").value.length !== 0) {
        localStorage.setItem("name", $("#profile").value);
        $("#profile").size = $("#profile").value.length;
    } 
    
    // If it is empty, save & reset the name to "Anonymous"
    else {
        localStorage.setItem("name", "Anonymous");
        $("#profile").value.length = 9;
    }
});

// When the page first loads, set the "name" text box to the saved name (or "Anonymous" if none is saved)
$("#profile").value = localStorage.getItem("name") ?? "Anonymous";

// Replace "Room" with the room code when hovering
$("#room-tab").on("mouseover", event => {
    if (roomCode) $("#room-text").innerHTML = roomCode;
});

// Replace the room code with "Room" when stopping hovering
$("#room-tab").on("mouseout", event => {
    $("#room-text").innerHTML = "Room";
});

$("#lobby-tab").on("click", event => {
    if (roomCode) enterLobby();
    else enterPreLobby();
});

// Delete the room if someone closes the window. Will add support ASAP for only doing this if the host closes / migrating hosts.
window.on("beforeunload", event => {
    if (roomCode) rooms.remove(roomCode);
});

$("#randomize-name").on("click", event => {
    let names = [
        "Castiel",
        "Sam",
        "Dean",
        "Meg",
        "John",
        "Azazel",
        "Ash",
        "Mary",
        "Chuck",
        "Bobby",
        "Rufus",
        "Kevin",
        "Jack",
        "Crowley",
        "Ellen",
        "Jo",
        "Gabriel",
        "Rowena",
        "Charlie",
        "Garth",
        "Gadreel",
        "Metatron",
        "Michael",
        "Alastair",
        "Dagon",
        "Lilith",
        "Ruby",
        "Jody",
        "Eileen",
        "Adam",
        "Becky",
        "Pamela",
        "Michigan",
        "Gordon"
    ];
    let original = $("#profile").value;
    while ($("#profile").value === original) $("#profile").value = names[Math.floor(Math.random() * names.length)];
    $("#profile").dispatchEvent(new Event("input"));
});

export function invalidRoomCode() {
    $("#join-room-tooltip-triangle").style.display = "block";
    $("#join-room-tooltip").style.display = "flex";
}
