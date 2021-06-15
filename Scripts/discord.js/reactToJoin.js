global.mainCh = msg.channel;
msg.channel.send("React to join!").then(
    msg => {
        global.reactableMessage = msg;
        global.reactableMessage.react("👍");
        global.attachCollect();
    }
);
global.attachCollect = () => {
    global.reactableMessage.awaitReactions(r => true, {max: 10, time: 3000})
    .then(reactions => {
        global.mainCh.send(reactions.first().users.cache.map(e => e.username))
    })
    .catch(_ => _)
}