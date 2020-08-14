

const SHA256=require('crypto-js/sha256')

// Block structure
class Block{
    //we call attributes that a block need 
    constructor(timestamp,lastHash,hash,data){
        //input given to this constructor bind to the class
        this.timestamp=timestamp;
        this.lastHash=lastHash;
        this.hash=hash;
        this.data=data;

    }

    toString(){
    return `Block -
        Timestamp   : ${this.timestamp}
        Last Hash   : ${this.lastHash.substring(0,10)}
        Hash        : ${this.hash.substring(0, 10)}
        Data        : ${this.data}
    `
    }

    static genesis(){
        return new this('Genesis time','-------','f1r57-h45h',[])
    }

    static mineBlock(lastBlock, data){
        const timestamp = Date.now();
        const lastHash = lastBlock.hash;
        const hash = Block.hash(timestamp, lastHash, data);

        //return the new instance of the block (it is same as genesis)
        return new this (timestamp,lastHash, hash, data);
    }

    static hash(timestamp,lastHash, data){
        return SHA256(`${timestamp} ${lastHash}${data}`).toString();
    }

    static createBlockHash(block) {
        const {timestamp, lastHash, data} = block;
        return Block.hash(timestamp, lastHash, data);
    }
}

module.exports=Block;