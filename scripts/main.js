let myImage = document.querySelector('img');
let currentPlayer = 1;
let t1S, t2S, t3S, t4S, t5S, t6S, t7S, t8S, t9S = false;

/*
if (!localStorage.getItem('username')) {
    getUsername();
}


 */

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

    t1S = t2S = t3S = t4S = t5S = t6S = t7S = t8S = t9S = false;

    document.getElementById('playerWon').textContent = " "
};

// console.log(items[0][2]);
//switch image

//username button
/*
document.getElementById('button1').onclick = function () {
    getUsername();
};

 */

// document.getElementById('a').textContent = 'Welcome ' + localStorage.getItem('username');

document.getElementById('a').addEventListener('click', () => {
    alert('Pogg Endlich')
});

function getUsername() {
    let userName = prompt('Enter Username');
    localStorage.setItem('username', userName);
    window.location.reload();
}

//play field
document.getElementById('t1').onclick = function () {
    if (!t1S) {
        play('t1', 0, 0);
        t1S = true;
    }
};
document.getElementById('t2').onclick = function () {
    if (!t2S) {
        play('t2', 0, 1);
        t2S = true;
    }
};
document.getElementById('t3').onclick = function () {
    if (!t3S) {
        play('t3', 0, 2);
        t3S = true;
    }
};
document.getElementById('t4').onclick = function () {
    if (!t4S) {
        play('t4', 1, 0);
        t4S = true;
    }
};
document.getElementById('t5').onclick = function () {
    if (!t5S) {
        play('t5', 1, 1);
        t5S = true;
    }
};
document.getElementById('t6').onclick = function () {
    if (!t6S) {
        play('t6', 1, 2);
        t6S = true;
    }
};
document.getElementById('t7').onclick = function () {
    if (!t7S) {
        play('t7', 2, 0);
        t7S = true;
    }
};
document.getElementById('t8').onclick = function () {
    if (!t8S) {
        play('t8', 2, 1);
        t8S = true;
    }
};
document.getElementById('t9').onclick = function () {
    if (!t9S) {
        play('t9', 2, 2);
        t9S = true;
    }
};


function play(id, x, y) {
    if (currentPlayer === 1) {
        document.getElementById(id).textContent = 'X';
        items[x][y] = 1;
    } else {
        document.getElementById(id).textContent = 'O';
        items[x][y] = 2;
    }

    if (currentPlayer === 2) {
        currentPlayer = 1;
    } else currentPlayer = 2;

    let cpl
    if (currentPlayer === 1) cpl = 'Current Player: 1 (X)'
    else cpl = 'Current Player: 2 (O)';
    document.getElementById('playerOnTurn').textContent = cpl;

    checkWin(1);
    checkWin(2);
}

function checkWin(player) {
    if ((items[0][0] === player & items[0][1] === player && items[0][2] === player) ||
        (items[1][0] === player && items[1][1] === player && items[1][2] === player) ||
        (items[2][0] === player && items[2][1] === player && items[2][2] === player) ||
        //top down
        (items[0][0] === player && items[1][0] === player && items[2][0] === player) ||
        (items[0][1] === player && items[1][1] === player && items[2][1] === player) ||
        (items[0][2] === player && items[1][2] === player && items[2][2] === player) ||
        //diagonal
        (items[0][0] === player && items[1][1] === player && items[2][2] === player) ||
        (items[0][2] === player && items[1][1] === player && items[2][0] === player)) {

        //alert('Player ' + player + ' Won')
        document.getElementById('playerWon').textContent = "Player " + player + " won!"
        t1S = t2S = t3S = t4S = t5S = t6S = t7S = t8S = t9S = true;
    }else if (items[0][0], items[0][1],items[0][2],items[1][0],items[1][1],items[1][2],items[2][0],items[2][1],items[2][2] !== 0) {
        document.getElementById('playerWon').textContent = "Tie"
    }
}