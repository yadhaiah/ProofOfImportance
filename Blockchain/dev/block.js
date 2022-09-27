const sha256 = require('sha256');

function Blockchain() {
    this.chain = [];
    this.pendingTransactions = [];
    
    this.createNewBlock('','00000000000000000000000',-1);
}

Blockchain.prototype.createNewBlock = function(previousBlockHash, hash, leader) {
    const newBlock = {
        index:this.chain.length+1,
        timestamp: Date.now(),
        transactions:this.pendingTransactions,
        previousBlockHash:previousBlockHash,
        blockHash: hash,
        nodeCreated: leader
    };

    this.pendingTransactions = [];
    this.chain.push(newBlock);

    return newBlock;

}

Blockchain.prototype.getLastBlock = function() {
    return this.chain[this.chain.length-1];
}

Blockchain.prototype.createNewTransaction = function(sender,receiver,amount) {
    const NewTransaction = {
        sender:sender,
        receiver:receiver,
        amount : amount,
        timestamp: Date.now()
    };
    this.pendingTransactions.push(NewTransaction);

}

Blockchain.prototype.getLatestTransactions = function() {
    return this.pendingTransactions;
}

Blockchain.prototype.hashBlock = function(previousBlockHash) {
    const dataAsString = previousBlockHash + JSON.stringify(this.pendingTransactions);
    const hash = sha256(dataAsString);
    return hash;
}

/*Blockchain.prototype.proofOfWork = function(previousBlockHash,currentBlockData) {
    let nonce = 0;
    let hash = this.hashBlock(previousBlockHash,currentBlockData,nonce) ;
    while(hash.substring(0,4)!=='0000') {
        nonce++;
        hash = this.hashBlock(previousBlockHash,currentBlockData,nonce);
    }
    return nonce;

} */
module.exports = Blockchain;