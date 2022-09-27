function User() {
    this.users = [];
}

User.prototype.addUser = function() {
    const balance = Math.floor(Math.random()*1000);
    const tr = [];
    const newUser = {
        userId: this.users.length+1,
        balance: balance,
        stakedValue:0,
        score:0,
        trasactions:tr
    };

    this.users.push(newUser);
    //return newUser;
}

User.prototype.AllUsers = function() {
    let i = 0;
    while(i<this.users.length) {
        console.log(this.users[i]);
        i++;
    }
}

User.prototype.addTransaction = function(sender,receiver,amount) {
    const ss = this.users[sender-1];
    const rr = this.users[receiver-1];
    let scoreAdd = 0;
    if(amount>80){
        scoreAdd = Math.floor(amount / 10);
    }
    if(ss.balance >= amount) {
        ss.balance = ss.balance - amount;
        ss.score = ss.score + scoreAdd;
        ss.trasactions.push(sender + ' -> ' + receiver + ' -> ' + amount);

        rr.balance = rr.balance + amount;
        rr.score = rr.score + scoreAdd;
        rr.trasactions.push(sender + ' -> ' + receiver + ' -> ' + amount);
        
        //console.log(ss);
        //console.log(rr);

        return true;

    } else {
        return false;
    }


}

User.prototype.stakeAbove = function() {
    const stake = [];
    let i = 0;
    while(i<this.users.length) {
        if(this.users[i].stakedValue > 80) {
            stake.push(this.users[i]);
        }
        i++;
    }
    return stake;
}

User.prototype.iterateStaked = function() {
    let stakedAll = [];
    do{
        let i = 0;
        while(i<this.users.length) {
            if(this.users[i].balance >= 10) {
                const stakeToAdd = Math.floor(this.users[i].balance / 10);
                this.users[i].stakedValue = this.users[i].stakedValue + stakeToAdd;
                this.users[i].balance = this.users[i].balance - stakeToAdd;
            }
            i++;

            //console.log(this.users[i]);
        }

        stakedAll = this.stakeAbove();
    }while(stakedAll.length<1);

    return stakedAll;
}

User.prototype.leaderSelection = function(u) {
    let lead = [];
    let total = 0;
    let i = 0;
    while(i<u.length) {
        const nn = {
            userId : u[i].userId,
            totalValue: u[i].stakedValue + u[i].score
        };
        total = total + u[i].stakedValue + u[i].score;
        lead.push(nn);
        i++;
    }
    i = 0;
    while(i<lead.length) {
        lead[i].totalValue = (lead[i].totalValue / total);
        i++;
    }
    const randomUser = Math.random();
    let sum=0;
    for (let i = 0; i < lead.length; i++) {
        sum +=lead[i].totalValue;
        if(randomUser<=sum){
            return u[i];
        }
    }
}

module.exports = User;