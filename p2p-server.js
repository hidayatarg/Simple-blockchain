const Websocket = require('ws');

const P2P_PORT =  process.env.P2P_PORT || 5001;

// instance will be made according to p2p => All web socket array
const peers = process.env.PEERS ? process.env.PEERS.split(','):[];

class p2pServer {
    constructor(blockchain){
        this.blockchain = blockchain;
        this.sockets = [];
    }

    // For listening
    listen() {
        const server = new Websocket.Server({port: P2P_PORT});
        // Listen for the incoming messages
        // Fire when new socket connected call back function will do work
        server.on('connection', socket => this.connectSocket(socket));
        
        this.connectToPeers();
        console.log(`Listening for peer-to-peer connections on: ${P2P_PORT}`);

      
    }

    connectToPeers() {
        // For each pairs
        peers.forEach(peer => {
            // ws:localhost:501
            const socket = new Websocket(peer);
            // start serverç
            socket.on('open', () => this.connectSocket(socket))
        });
    }

    connectSocket(socket) {
        this.sockets.push(socket);
        console.log('Socket connected');
        this.messageHandler(socket);
        // sendChain
        this.sendChain(socket)
    }

    messageHandler(socket) {
        socket.on('message', message => {
            // convert Stringfy to JSON
            const data = JSON.parse(message);
            console.log('data', data);
        })
    }

    sendChain(socket) {
        socket.send(JSON.stringify(this.blockchain.chain));
    }

    // synchroize the changes
    syncChain() {
        this.sockets.forEach(socket =>this.sendChain(socket));
    }
}


module.exports = p2pServer;
