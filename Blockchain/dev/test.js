const Blockchain = require('./block');
const User = require('./users');

const NEM = new Blockchain();
const users = new User();
console.log(NEM);
console.log('---------------------------------------------------------------------------------------------');

for(let i=0;i<4;i++){
    users.addUser();
}

let valid = users.addTransaction(1,2,100);
if(valid) {
    NEM.createNewTransaction(1,2,100);
}
valid = users.addTransaction(3,1,120);
if(valid) {
    NEM.createNewTransaction(3,1,120);
}
valid = users.addTransaction(4,1,201);
if(valid) {
    NEM.createNewTransaction(4,1,201);
}
valid = users.addTransaction(1,3,145); 
if(valid) {
    NEM.createNewTransaction(1,3,145);
}
valid = users.addTransaction(3,2,87);
if(valid) {
    NEM.createNewTransaction(3,2,87);
}
valid = users.addTransaction(2,4,90);
if(valid) {
    NEM.createNewTransaction(2,4,90);
}
valid = users.addTransaction(3,2,105);
if(valid) {
    NEM.createNewTransaction(3,2,105);
}
valid = users.addTransaction(3,4,168);
if(valid) {
    NEM.createNewTransaction(3,4,168);
}

//console.log(users.AllUsers());

const op = users.iterateStaked();
const leader = users.leaderSelection(op);
const lead = {
    userId: leader.userId,
    stakedValue: leader.stakedValue,
    score: leader.score
};
console.log(lead);


const prevBlockHash = NEM.getLastBlock().blockHash;
const hash = NEM.hashBlock(prevBlockHash);
const block = NEM.createNewBlock(prevBlockHash, hash, lead.userId);
console.log(block);
console.log("-----------------------------------------------------------------------------------------------");







