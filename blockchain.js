const Block = require('./block');

class Blockchain {
    constructor() {
        this.chain=[Block.genesis()];
    }


    addBlock(data) {
        const lastBlock = this.chain[this.chain.length - 1];

        // Generate new block
        const block = Block.mineBlock(lastBlock, data);
        this.chain.push(block);
        return block;
    }

    isValidChain(chain) {
        // Check first block
        if(JSON.stringify(chain[0])!== JSON.stringify(Block.genesis())) 
            return false;
        
        for (let i = 0; i < chain.length; i++) {
            const currentBlock = chain[i];
            const lastBlock = chain[i-1];
            if (currentBlock.lashHash !== lastBlock.hash || currentBlock.lashHash!==Block.blockHash(currentBlock)) 
                return false;
            
        }

        return true;
    }

    // Make sure it is a longer chain than the current chain
    replaceChain(newChain) {
        if (newChain.lenght <= this.chain.length) {
            console.log('The Recieved chain is not longer than the current chain.')
            return; 
        } else if(!this.isValidChain(newChain)) {
            console.log('The recieved chain is not valid.');
            return
        }
        console.log('Replacing block chain with the new chain');
        this.chain = newChain;
    }
}

module.exports = Blockchain;