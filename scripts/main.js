let currentPlayer = 1;
let t1S, t2S, t3S, t4S, t5S, t6S, t7S, t8S, t9S = false;
let multiplayer = false;

//let items = [
//    [0, 0, 0],
//    [0, 0, 0],
//    [0, 0, 0]
//];
const playField = {t1: "0", t2: "0", t3: "0", t4: "0", t5: "0", t6: "0", t7: "0", t8: "0", t9: "0"};
//start game | clear screen
document.getElementById('startGame').onclick = function () {
    console.log('Clear pressed');
    for (let i = 1; i < 9; i++) {
        let c = "t" + i
        playField[c] = 0;
    }
    //items = [
    //    [0, 0, 0],
    //    [0, 0, 0],
    //    [0, 0, 0]
    //];


    currentPlayer = 1;
    document.getElementById('playerOnTurn').textContent = 'Current Player: 1 (X)';
    document.getElementById('t1').textContent = ' ';
    document.getElementById('t2').textContent = ' ';
    document.getElementById('t3').textContent = ' ';
    document.getElementById('t4').textContent = ' ';
    document.getElementById('t5').textContent = ' ';
    document.getElementById('t6').textContent = ' ';
    document.getElementById('t7').textContent = ' ';
    document.getElementById('t8').textContent = ' ';
    document.getElementById('t9').textContent = ' ';

    setHovers("hover")

    t1S = t2S = t3S = t4S = t5S = t6S = t7S = t8S = t9S = false;

    document.getElementById('playerWon').textContent = " "
};


//play field
document.getElementById('t1').onclick = function () {
    if (!t1S) {
        play("t1");
        t1S = true;
    }
};
document.getElementById('t2').onclick = function () {
    if (!t2S) {
        play("t2");
        t2S = true;
    }
};
document.getElementById('t3').onclick = function () {
    if (!t3S) {
        play("t3");
        t3S = true;
    }
};
document.getElementById('t4').onclick = function () {
    if (!t4S) {
        play("t4");
        t4S = true;
    }
};
document.getElementById('t5').onclick = function () {
    if (!t5S) {
        play("t5");
        t5S = true;
    }
};
document.getElementById('t6').onclick = function () {
    if (!t6S) {
        play("t6");
        t6S = true;
    }
};
document.getElementById('t7').onclick = function () {
    if (!t7S) {
        play("t7");
        t7S = true;
    }
};
document.getElementById('t8').onclick = function () {
    if (!t8S) {
        play("t8");
        t8S = true;
    }
};
document.getElementById('t9').onclick = function () {
    if (!t9S) {
        play("t9");
        t9S = true;
    }
};
//peerjs
let peer
let conn

function createPeerJS() {

    multiplayer = true;

    peer = new Peer();
    peer.on('open', function (id) {
        console.log('My peer ID is: ' + id);
        document.getElementById("peerID").innerText = "Your ID is: " + id
        //parent.navigator.clipboard.writeText(id);
    });
}

function createConnection(dest) {
    conn = peer.connect(dest);
    console.log("connected to : " + dest)
    conn.on("open", () => {
        conn.send("hi!");
    });

    console.log("g");

}

// ISSUE der als erstes connected muss nochmal verbinden für beidseitige Connection
document.getElementById("startMultGame").onclick = function () {
    console.log(document.getElementById("destPlayerID").value);
    createConnection(document.getElementById("destPlayerID").value);
    peer.on("connection", (conn) => {
        conn.on("data", (data) => {
            // Will print 'hi!'
            console.log(data);
            receivedState(data)
        });
        conn.on("open", () => {
            conn.send("hello!");
        });
    });
};

//let dest;


document.getElementById('getID').onclick = function () {
    createPeerJS();
};
document.getElementById("testSend").onclick = function () {
    conn.send("Test Message");
};

//let fieldID;

function play(t) {
    if (t) {
        //fieldID = t

        //if field is given:
        //write to field object depending on player
        if (currentPlayer === 1) {
            playField[t] = "X"
            document.getElementById(t).textContent = 'X';
            document.getElementById(t).style.color = 'blue';
        } else if (currentPlayer === 2) {
            playField[t] = "O"
            document.getElementById(t).textContent = 'O';
            document.getElementById(t).style.color = 'red';
        }
    }
    if (!t) {

        for (let i = 1; i < 9; i++) {
            let c = "t" + i
            if (playField[c] === "X") {
                document.getElementById(t).textContent = 'X';
                document.getElementById(t).style.color = 'blue';
            } else if (playField[c] === "O") {
                document.getElementById(t).textContent = 'O';
                document.getElementById(t).style.color = 'red';
            }
        }
    }

    //console.log("ID: " + fieldID);
    //if (currentPlayer === 1) {
    //    document.getElementById(fieldID).textContent = 'X';
    //    document.getElementById(fieldID).style.color = 'blue';
    //    if (items[x][y] === 0) {
    //        items[x][y] = 1;
    //    }
//
    //} else {
    //    document.getElementById(fieldID).textContent = 'O';
    //    document.getElementById(fieldID).style.color = 'red';
    //    if (items[x][y] === 0) {
    //        items[x][y] = 2;
    //    }
//
    //}
//
    //change player
    if (currentPlayer === 2) {
        currentPlayer = 1;
    } else currentPlayer = 2;

    //update current player shown
    let cpl
    if (currentPlayer === 1) cpl = 'Current Player: 1 (X)'
    else cpl = 'Current Player: 2 (O)';
    document.getElementById('playerOnTurn').textContent = cpl;

    if (!(checkWin("X") || checkWin("O"))) {
        checkTie();
    }

    document.getElementById(t).className = "noHover";
    //send state for multiplayer
    if (multiplayer) {
        sendState();
    }
}

function sendState() {
    const gameState = {playField: playField, currentPlayer: currentPlayer};

    conn.send(gameState);
    //conn.send(items);
    //conn.send(currentPlayer);
}

function receivedState(data) {
    //if (Array.isArray(data)) {
    //    items = data;
    //    console.log("isArray")
    //    arrayToPlayField();
    //}
    //items = data.items;

    console.log("Rec items: ")
    //console.log(data.items);
    currentPlayer = data.currentPlayer;


}

function checkWin(player) {
    if ((playField.t1 === player && playField.t2 === player && playField.t3 === player) ||
        (playField.t4 === player && playField.t5 === player && playField.t6 === player) ||
        (playField.t7 === player && playField.t8 === player && playField.t9 === player) ||
        //top down
        (playField.t1 === player && playField.t4 === player && playField.t7 === player) ||
        (playField.t2 === player && playField.t5 === player && playField.t8 === player) ||
        (playField.t3 === player && playField.t6 === player && playField.t9 === player) ||
        //diagonal
        (playField.t1 === player && playField.t5 === player && playField.t9 === player) ||
        (playField.t3 === player && playField.t5 === player && playField.t7 === player)) {

        document.getElementById('playerWon').textContent = "Player " + player + " won!"
        if (player === 1) document.getElementById('playerWon').style.color = 'blue';
        else document.getElementById('playerWon').style.color = 'red';
        t1S = t2S = t3S = t4S = t5S = t6S = t7S = t8S = t9S = true;

        setHovers("noHover")
        return true
    }
    return false
}

function checkTie() {
    if (
        playField.t1 !== 0 && playField.t2 !== 0 &&
        playField.t7 !== 0 && playField.t4 !== 0 &&
        playField.t5 !== 0 && playField.t6 !== 0 &&
        playField.t7 !== 0 && playField.t8 !== 0 &&
        playField.t9 !== 0) {


        document.getElementById('playerWon').textContent = "Tie";
        document.getElementById('playerWon').style.color = ' ';


    }
}

function setHovers(cssClass) {
    /*
    CSS Classes:
    noHover
    hover
     */
    document.getElementById('t1').className = cssClass;
    document.getElementById('t2').className = cssClass;
    document.getElementById('t3').className = cssClass;
    document.getElementById('t4').className = cssClass;
    document.getElementById('t5').className = cssClass;
    document.getElementById('t6').className = cssClass;
    document.getElementById('t7').className = cssClass;
    document.getElementById('t8').className = cssClass;
    document.getElementById('t9').className = cssClass;
}

