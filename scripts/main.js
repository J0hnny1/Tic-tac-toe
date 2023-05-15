let currentPlayer = 'X';
let multiplayer = false;
let multiplayerPlayer

const playField = {t1: "0", t2: "0", t3: "0", t4: "0", t5: "0", t6: "0", t7: "0", t8: "0", t9: "0"};
let fieldSet = {t1: false, t2: false, t3: false, t4: false, t5: false, t6: false, t7: false, t8: false, t9: false};
//start game | clear screen
document.getElementById('startGame').onclick = function () {
    console.log('Clear pressed');
    for (let i = 1; i < 10; i++) {
        let c = "t" + i
        playField[c] = 0;
        fieldSet[c] = false
        document.getElementById(c).textContent = ' ';
    }


    currentPlayer = 'X';
    document.getElementById('playerOnTurn').textContent = 'Current Player: 1 (X)';
    setHovers("hover")

    document.getElementById('playerWon').textContent = " "
};


//play field
document.getElementById('t1').onclick = function () {
    fieldClicked('t1')
};
document.getElementById('t2').onclick = function () {
    fieldClicked('t2')
};
document.getElementById('t3').onclick = function () {
    fieldClicked('t3')
};
document.getElementById('t4').onclick = function () {
    fieldClicked('t4')
};
document.getElementById('t5').onclick = function () {
    fieldClicked('t5')
}
document.getElementById('t6').onclick = function () {
    fieldClicked('t6')
}
document.getElementById('t7').onclick = function () {
    fieldClicked('t7')
}
document.getElementById('t8').onclick = function () {
    fieldClicked('t8')
}
document.getElementById('t9').onclick = function () {
    fieldClicked('t9')
}

function fieldClicked(t) {
    if (!fieldSet[t]) {
        playField[t] = currentPlayer
        play()
        if (multiplayer) sendState()
        fieldSet[t] = true
    }
}

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

    if (multiplayerPlayer === 0) multiplayerPlayer = 'X'
    else multiplayerPlayer = 'O'
    document.getElementById("youArePlayer").innerText = "You are Player: " + multiplayerPlayer
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
function play() {
    for (let i = 1; i < 10; i++) {
        let c = "t" + i
        if (playField[c] === 'X') {
            document.getElementById(c).style.color = 'blue';
            document.getElementById(c).textContent = playField[c];
            document.getElementById(c).className = "noHover";
        } else if (playField[c] === 'O') {
            document.getElementById(c).style.color = 'red';
            document.getElementById(c).textContent = playField[c];
            document.getElementById(c).className = "noHover";
        }
    }
    if (currentPlayer === 'O') {
        currentPlayer = 'X';
    } else currentPlayer = 'O';

    //update current player shown
    let cpl
    if (currentPlayer === 'X') cpl = 'Current Player: 1 (X)'
    else cpl = 'Current Player: 2 (O)';
    document.getElementById('playerOnTurn').textContent = cpl;

    if (!(checkWin("X") || checkWin("O"))) {
        checkTie();
    }

}

function sendState() {
    const gameState = {playField: playField, player: 'O'};

    conn.send(gameState);
    //conn.send(items);
    //conn.send(currentPlayer);
}

function receivedState(data) {
    console.log("Rec items: ")
    //console.log(data.items);
    //currentPlayer = data.currentPlayer;
    console.log(playField)

    for (let i = 1; i < 10; i++) {
        let c = "t" + i
        playField[c] = data.playField[c];
        if (data.playField[c] !== 'X' && data.playField[c] !== 'O') {
            playField[c] = 0;
        }
    }
    play();
    /*
    if (currentPlayer === 'X') currentPlayer = 'O'
    else if (currentPlayer === 'O') currentPlayer = 'X'

     */


    //playField[data.field] = data.player
    //play()
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
        if (player === 'X') document.getElementById('playerWon').style.color = 'blue';
        else document.getElementById('playerWon').style.color = 'red';

        for (let i = 1; i < 10; i++) {
            let c = "t" + i
            fieldSet[c] = true
        }

        setHovers("noHover")
        return true
    }
    return false
}

function checkTie() {
    if (
        playField.t1 !== '0' && playField.t2 !== '0' &&
        playField.t3 !== '0' && playField.t4 !== '0' &&
        playField.t5 !== '0' && playField.t6 !== '0' &&
        playField.t7 !== '0' && playField.t8 !== '0' &&
        playField.t9 !== '0') {


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
    for (let i = 1; i < 10; i++) {
        let c = "t" + i
        document.getElementById(c).className = cssClass;
    }
}

