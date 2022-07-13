import * as firebase from "https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js";
import * as firedata from "https://www.gstatic.com/firebasejs/9.8.4/firebase-database.js";
import { $, leaveLobby, enterLobby, invalidRoomCode } from "../script.js";

const firebaseConfig = {
    apiKey: "AIzaSyDmlS4cctSSevFlzPId0DuT--jPt4bddmo",
    authDomain: "apex-roulette-137b6.firebaseapp.com",
    databaseURL: "https://apex-roulette-137b6-default-rtdb.firebaseio.com/",
    projectId: "apex-roulette-137b6",
    storageBucket: "apex-roulette-137b6.appspot.com",
    messagingSenderId: "678177493627",
    appId: "1:678177493627:web:195dc29339529bc46b48de"
};

const app = firebase.initializeApp(firebaseConfig);
const database = firedata.getDatabase(app);

/**
 * Generates a random room code. Does not yet check if the room code already exists.
 * 
 * @param length the length of the room code to generate
 * 
 * @returns The generated room code
 */
export function generateRoomCode(length) {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
    function randomLetter() { return alphabet[Math.floor(Math.random() * alphabet.length)]; }
    let code = "";
    for (let i = 0; i < length; i++) code += randomLetter();
    return code;
}

/**
 * Creates a room.
 * 
 * @param roomCode the room code.
 */
export function create(roomCode) {
    
    let ref = firedata.ref(database, `rooms/${roomCode}/players`);

    // Set player one to the current player
    firedata.set(ref, {
        one: {
            name: $("#profile").value
        }
    });

    listen(ref);

}

function listen(ref) {
    firedata.onValue(ref, snapshot => {

        if (!snapshot.exists()) {
            leaveLobby();
            return;
        }
        
        if (snapshot.val().two) $("#left-player-name").innerHTML = snapshot.val().two.name;
        if (snapshot.val().three) $("#right-player-name").innerHTML = snapshot.val().three.name;
    });
}

export function join(roomCode) {

    let username = $("#profile").value;

    let ref = firedata.ref(database, `rooms/${roomCode}/players`);
    listen(ref);

    // Check the value of the room
    firedata.get(ref).then(snapshot => {

        // Check if the room exists
        if (snapshot.exists()) {
            
            // Check if there is not a player 2 already
            if (!snapshot.val().two) {
                firedata.set(firedata.child(ref, "two"), {
                    name: username
                });

                $("#left-player-name").innerHTML = snapshot.val().one.name;
            }

            // Otherwise, make the user player 3
            else {
                firedata.set(firedata.child(ref, "three"), {
                    name: username
                });

                $("#left-player-name").innerHTML = snapshot.val().one.name;
                $("#right-player-name").innerHTML = snapshot.val().two.name;
            }

            enterLobby();
        }

        else invalidRoomCode();
    }, 
    
    rejection => {
        invalidRoomCode();
    });


}

export function remove(roomCode) {
    firedata.remove(firedata.ref(database, `rooms/${roomCode}`));
}