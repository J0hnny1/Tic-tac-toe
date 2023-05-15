const peer = new Peer();
let destID;
let conn

document.getElementById('enterID').onclick = function () {
    destID = prompt("Please enter ID from other Player");
    console.log("con startet")
    conn = peer.connect(destID);
    conn.on("open", () => {
        conn.send("hi!");
    });

    peer.on("connection", (conn) => {
        conn.on("data", (data) => {
            // Will print 'hi!'
            console.log(data);
        });
        conn.on("open", () => {
            conn.send("hello!");
        });
    });
}
console.log("DestID: " + destID)
peer.on('open', function(id) {
    console.log('My peer ID is: ' + id);
});

document.getElementById("send").onclick = function (){
    conn.send("A Message!");
}