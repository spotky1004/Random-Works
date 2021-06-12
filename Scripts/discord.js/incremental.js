global.Game = class {
    constructor () {
        this.point = 0;
    };
    
    increment() {
        this.point += 1;
        this.point += Math.floor(this.point*0.1);
        this.point += Math.floor(this.point**1.01-this.point);
        return `You have ${this.point} point`;
    }
};

global.gameSaveData = new Game();
msg.channel.send("You have 0 point").then(
    msg => {
        global.incrementMessage = msg;
        global.incrementMessage.react(":arrow_up:");
        global.updateIncrementMessage();
    }
); global.updateIncrementMessage = () => {
    global.incrementMessage.awaitReactions(r => true, {max: 1, time: 60000})
    .then(_ => {
        global.incrementMessage.edit(global.gameSaveData.increment())
        .then(n => global.updateIncrementMessage())
        .catch(e => global.incrementMessage.channel.send(e))
    })
};