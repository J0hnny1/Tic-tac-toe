let currentPlayer = 1;
let t1S, t2S, t3S, t4S, t5S, t6S, t7S, t8S, t9S = false;


let items = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];

//start game | clear screen
document.getElementById('startGame').onclick = function () {
    console.log('Clear pressed');
    items = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];
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
        play(0, 0);
        t1S = true;

    }
};
document.getElementById('t2').onclick = function () {
    if (!t2S) {
        play(0, 1);
        t2S = true;
    }
};
document.getElementById('t3').onclick = function () {
    if (!t3S) {
        play(0, 2);
        t3S = true;
    }
};
document.getElementById('t4').onclick = function () {
    if (!t4S) {
        play(1, 0);
        t4S = true;
    }
};
document.getElementById('t5').onclick = function () {
    if (!t5S) {
        play(1, 1);
        t5S = true;
    }
};
document.getElementById('t6').onclick = function () {
    if (!t6S) {
        play(1, 2);
        t6S = true;
    }
};
document.getElementById('t7').onclick = function () {
    if (!t7S) {
        play(2, 0);
        t7S = true;
    }
};
document.getElementById('t8').onclick = function () {
    if (!t8S) {
        play(2, 1);
        t8S = true;
    }
};
document.getElementById('t9').onclick = function () {
    if (!t9S) {
        play(2, 2);
        t9S = true;
    }
};
//peerjs
let peer
let conn

function createPeerJS() {
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

let fieldID;

function play(x, y) {

    if (x === 0 && y === 0) {
        fieldID = "t1";
    } else if (x === 0 && y === 1) {
        fieldID = "t2";
    } else if (x === 0 && y === 2) {
        fieldID = "t3";
    } else if (x === 1 && y === 0) {
        fieldID = "t4";
    } else if (x === 1 && y === 1) {
        fieldID = "t5";
    } else if (x === 1 && y === 2) {
        fieldID = "t6";
    } else if (x === 2 && y === 0) {
        fieldID = "t7";
    } else if (x === 2 && y === 1) {
        fieldID = "t8";
    } else if (x === 2 && y === 2) {
        fieldID = "t9";
    }
    console.log("ID: " + fieldID);
    if (currentPlayer === 1) {
        document.getElementById(fieldID).textContent = 'X';
        document.getElementById(fieldID).style.color = 'blue';
        if (items[x][y] === 0){
            items[x][y] = 1;
        }

    } else {
        document.getElementById(fieldID).textContent = 'O';
        document.getElementById(fieldID).style.color = 'red';
        if (items[x][y] === 0){
            items[x][y] = 2;
        }

    }

    if (currentPlayer === 2) {
        currentPlayer = 1;
    } else currentPlayer = 2;

    let cpl
    if (currentPlayer === 1) cpl = 'Current Player: 1 (X)'
    else cpl = 'Current Player: 2 (O)';
    document.getElementById('playerOnTurn').textContent = cpl;

    if (!(checkWin(1) || checkWin(2))) {
        checkTie();
    }

    document.getElementById(fieldID).className = "noHover";
    sendState();
}

function sendState() {
    const gameState = {items: items, currentPlayer: currentPlayer};

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
    items = data.items;
    console.log("Rec items: ")
    console.log(data.items);
    currentPlayer = data.currentPlayer;

    console.log("Items: " + items);
    arrayToPlayField();
}

function arrayToPlayField() {
    console.log("arrayToFIeld");
    switch (items) {
        case items[0][0]:
            play(0, 0)
            t1S = true;
            break;
        case items[0][1]:
            play(0, 1);
            break;
        case items[0][2]:
            play(0, 2);
            break;
        case items[1][0]:
            play(1, 0);
            break;
        case items[2][0]:
            play(2, 0);
            break;
        case items[1][1]:
            play(1, 1);
            break;
        case items[2][2]:
            play(2, 2);
            break;
        case items[2][1]:
            play(2, 1);
            break;
        case items[1][2]:
            play(1, 2);
            break;
    }

}

function checkWin(player) {
    if ((items[0][0] === player && items[0][1] === player && items[0][2] === player) ||
        (items[1][0] === player && items[1][1] === player && items[1][2] === player) ||
        (items[2][0] === player && items[2][1] === player && items[2][2] === player) ||
        //top down
        (items[0][0] === player && items[1][0] === player && items[2][0] === player) ||
        (items[0][1] === player && items[1][1] === player && items[2][1] === player) ||
        (items[0][2] === player && items[1][2] === player && items[2][2] === player) ||
        //diagonal
        (items[0][0] === player && items[1][1] === player && items[2][2] === player) ||
        (items[0][2] === player && items[1][1] === player && items[2][0] === player)) {

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
        items[0][0] !== 0 && items[0][1] !== 0 &&
        items[0][2] !== 0 && items[1][0] !== 0 &&
        items[1][1] !== 0 && items[1][2] !== 0 &&
        items[2][0] !== 0 && items[2][1] !== 0 &&
        items[2][2] !== 0) {


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

