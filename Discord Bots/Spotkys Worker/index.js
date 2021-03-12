const Discord = require('discord.js');
const fetch = require('node-fetch');
const atob = require('atob');
const fs = require('fs');
const bot = new Discord.Client();

const token = 'I ate the token :v';

var logChannel;
bot.on('ready', () => {
  console.log('Online!');
  logChannel = bot.channels.cache.get(`819147151707602964`);
})

bot.on('message', msg=>{
  if ((msg.channel.id != "795458070813081610" && msg.channel.id != "776044089086443550" && msg.channel.id != "819147151707602964") || msg.author.bot) return;
  if (msg.attachments) {
    try {
      const attachmentsGot = msg.attachments.first();
      const url = attachmentsGot.url;
      let storedText;
      
      fetch(url)
        .then(function(response) {
          response.text().then(function(text) {
            storedText = text;
            validate();
          });
        });
      
      function validate() {
        try {
          const saveData = JSON.parse(atob(storedText));
          saveCheck(saveData);
        } catch(e) {
          console.log(e);
          msg.channel.send("**Error!**\nError message sent to DEV, please wait :D\nHey <@357504806358614035>");
        }
        msg.delete();
      }

      function saveCheck(save) {
        let done = 0;
        let game = "none";
        let goal;

        if (save.qubit) { // Calculartor Evolution
          game = "Calculator Evolution";
          goal = [...new Set(save.achievements)].length;
          msg.channel.send(`You have ${goal}/40 achievements`).then(msg => {
            msg.delete({timeout: 5000})
          });
          const role = msg.guild.roles.cache.find(role => role.name === game + "!");
          console.log(role);
          if (goal >= 40 && !msg.member.roles.cache.has("810329671073792020")) {
            msg.member.roles.add(role);
            msg.reply("🎉 You got " + game + " Role! 🎉").then(msg => {
              msg.delete({timeout: 15000});
            });
            done = 1;
          }
        } else if (save[2] && save[2].length == 100) { // Incremental Blocks
          game = "Incremental Blocks";
          goal = save[36];
          msg.channel.send(`You have ${goal}/15 BP`).then(msg => {
            msg.delete({timeout: 5000})
          });
          const role = msg.guild.roles.cache.find(role => role.name === game + "!");
          if (goal >= 15 && !msg.member.roles.cache.has("727083885023723532")) {
            msg.member.roles.add(role);
            msg.reply("🎉 You got " + game + " Role! 🎉").then(msg => {
              msg.delete({timeout: 15000});
            });
            done = 1;
          }
        } else if (save[11] && save[11].length == 43) { // Loot Clicker
          game = "Loot Clicker";
          goal = save[0];
          msg.channel.send(`You're level is ${goal}/210`).then(msg => {
            msg.delete({timeout: 5000})
          });
          const role = msg.guild.roles.cache.find(role => role.name === game + "!");
          if (goal >= 210 && !msg.member.roles.cache.has("702482835818414111")) {
            msg.member.roles.add(role);
            msg.reply("🎉 You got " + game + " Role! 🎉").then(msg => {
              msg.delete({timeout: 15000});
            });
            done = 1;
          }
        } else if (save.infUpgradeHave) { // Ordinal Dimensions
          game = "Ordinal Dimensions";
          goal = save.OP.array.length>=2 ? save.OP.array[0][1] : 0;
          msg.channel.send(`You're OP is e${goal}/e100`).then(msg => {
            msg.delete({timeout: 5000})
          });
          const role = msg.guild.roles.cache.find(role => role.name === game + "!");
          if (goal >= 100 && !msg.member.roles.cache.has("795478167237165068")) {
            msg.member.roles.add(role);
            msg.reply("🎉 You got " + game + " Role! 🎉").then(msg => {
              msg.delete({timeout: 15000});
            });
            done = 1;
          }
        }

        if (done) {
          logChannel.send(`<@${msg.author.id}> completed game - ${game} with ${goal}`,{
            files: [attachmentsGot.url]
          });
        }
      }
    } catch(e) {
      msg.delete();
    }
  } else {
    msg.delete();
  }
});


bot.login(token);
