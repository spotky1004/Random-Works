const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');
const botData = require("./botData.json");
let botDataD = JSON.stringify(botData);
fs.writeFile('./botData.json', botDataD, err => console.error);

const token = 'token!';

bot.on('ready', () => {
  console.log('online!');
})

var prefix = '-c';
bot.on('message', msg=>{
  try {
    if (msg.content.startsWith(prefix)) {
      if (!msg.member.hasPermission('ADMINISTRATOR')) {
        msgToSend = new Discord.MessageEmbed()
        .setColor(genColor(Math.random()))
        .attachFiles(['Images/connector.png'])
        .setAuthor('Connect', 'attachment://connector.png')
        .setDescription('You need ADMINISTRATOR permission on server to use this bot!');
        msg.channel.send(msgToSend);
        return;
      }
      msgArg = msg.content.substr(prefix.length+1).split(' ');
      command = msgArg[0];
      msgArg = msgArg.splice(1, msgArg.length);
      msgToSend = '';
      alphaStr = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_';
      switch (command) {
        case 'help':
        addLine('```css');
        addLine('invite - invite me!');
        addLine('connect - connect channels');
        addLine('```');
          break;
        case 'invite':
        msgToSend = new Discord.MessageEmbed()
        .setColor(genColor(Math.random()))
        .attachFiles(['Images/connector.png'])
        .setAuthor('Inivte', 'attachment://connector.png')
        .setDescription('Invite me!\ninviteLink');
          break;
        case 'connect':
        if (argTest(3)) {
          argDone = 0;
          if (botData[msgArg[0]] !== undefined) argDone++;
          if (bot.channels.cache.get(msgArg[1])) argDone++;
          if (bot.channels.cache.get(msgArg[1]).guild.id != msg.channel.guild.id) {
            msgToSend = new Discord.MessageEmbed()
            .setColor(genColor(Math.random()))
            .attachFiles(['Images/connector.png'])
            .setAuthor('Connect', 'attachment://connector.png')
            .setDescription("Cannot handle other server's channel!");
            msg.channel.send(msgToSend);
            return;
          }
          if (msgArg[2] == 'connect' || msgArg[2] == 'disconnect') argDone++;
          if (argDone >= 3) {
            if (msgArg[2] == 'connect') {
              dupeChannel = 0;
              for (var i = 0; i < botData.connectChannels.length; i++) {
                if (botData.connectChannels[i][0] == msgArg[1].toString()) {
                  dupeChannel = 1;
                  break;
                }
              }
              if (!dupeChannel) {
                botData.connectChannels.push([msgArg[1], msgArg[0]]);
                botData[msgArg[0]].channelConnected.push(msgArg[1]);
                msgToSend = new Discord.MessageEmbed()
                .setColor(genColor(Math.random()))
                .attachFiles(['Images/connector.png'])
                .setAuthor('Connect - connect', 'attachment://connector.png')
                .setDescription('Connected!');
              } else {
                msgToSend = new Discord.MessageEmbed()
                .setColor(genColor(Math.random()))
                .attachFiles(['Images/connector.png'])
                .setAuthor('Connect', 'attachment://connector.png')
                .setDescription('Cannot use 2 or more connector in one channel!');
              }
            } else {
              for (var i = 0; i < botData[msgArg[0]].channelConnected.length; i++) {
                if (botData[msgArg[0]].channelConnected[i] == msgArg[1]) {
                  pointThis = i;
                  break;
                }
                if (i == botData[msgArg[0]].channelConnected.length-1) {
                  pointThis = -1;
                }
              }
              if (botData[msgArg[0]].channelConnected.length == 0) {
                pointThis = -1;
              }
              if (pointThis != -1) {
                botData[msgArg[0]].channelConnected.splice(pointThis, 1);
                for (var i = 0; i < botData.connectChannels.length; i++) {
                  if (botData.connectChannels[i][0] == msgArg[1]) {
                    pointThis = i;
                    break;
                  }
                }
                botData.connectChannels.splice(pointThis, 1);
                msgToSend = new Discord.MessageEmbed()
                .setColor(genColor(Math.random()))
                .attachFiles(['Images/connector.png'])
                .setAuthor('Connect - disconnect', 'attachment://connector.png')
                .setDescription('Disconnected!');
              } else {
                msgToSend = new Discord.MessageEmbed()
                .setColor(genColor(Math.random()))
                .attachFiles(['Images/connector.png'])
                .setAuthor('Connect - disconnect', 'attachment://connector.png')
                .setDescription('Invaild channel!');
              }
            }
          } else {
            msgToSend = new Discord.MessageEmbed()
            .setColor(genColor(Math.random()))
            .attachFiles(['Images/connector.png'])
            .setAuthor('Connect', 'attachment://connector.png')
            .setDescription('Invaild argument!');
          }
        } else if (msgArg[0] == 'generate') {
          var keyGen = '';
          for (var i = 0; i < 12; i++) {
            keyGen += alphaStr[Math.floor(Math.random()*alphaStr.length)];
          }
          botData[keyGen] = {'channelConnected':[]};
          msgToSend = new Discord.MessageEmbed()
          .setColor(genColor(Math.random()))
          .attachFiles(['Images/connector.png'])
          .setAuthor('Connect - generate', 'attachment://connector.png')
          .setDescription('Your key is: `' + keyGen + '`');
        } else {
          msgToSend = new Discord.MessageEmbed()
          .setColor(genColor(Math.random()))
          .attachFiles(['Images/connector.png'])
          .setAuthor('Connect', 'attachment://connector.png')
          .setDescription('To connect server: `connect {key} {channelID} {connect/disconnect}`\nTo generate key: `connect generate`');
        }
          break;
      }
      if (msgToSend != '') {
        msg.channel.send(msgToSend);
      }
      writeSave();
    } else if (msg.author.id != "id") {
      connected = 0;
      connectPoint = 'null'
      for (var i = 0; i < botData.connectChannels.length; i++) {
        if (botData.connectChannels[i][0] == msg.channel.id.toString()) {
          connected = 1;
          connectPoint = botData.connectChannels[i][1];
        }
      }
      if (connected) {
        avatarURL = 'https://cdn.discordapp.com/avatars/' + msg.author.id + '/' + msg.author.avatar + '.webp?size=128';
        if (msg.attachments.size > 0) {
          console.log(msg.attachments.MessageAttachment);
        }
        msgToSend = new Discord.MessageEmbed()
        .setColor(genColor(Math.random()))
        .setAuthor(msg.author.username + '#' + msg.author.discriminator, avatarURL)
        .setDescription(msg.content)
        .setFooter(msg.guild.name + ' > ' + msg.channel.name);
        for (var i = 0; i < botData[connectPoint].channelConnected.length; i++) {
          if (botData[connectPoint].channelConnected[i] != msg.channel.id.toString()) {
            try {
              connectChannelC = bot.channels.cache.get(botData[connectPoint].channelConnected[i]);
              connectChannelC.send(msgToSend);
            } catch {

            }
          }
        }
      }
    }
  } catch(e) {
    msgToSend = new Discord.MessageEmbed()
    .setColor(genColor(Math.random()))
    .attachFiles(['Images/connector.png'])
    .setAuthor('Connect', 'attachment://connector.png')
    .setDescription('Bug warning!\n`' + e + '`');
    msg.channel.send(msgToSend);
  }
})

function writeSave() {
  fs.writeFile('./botData.json', JSON.stringify(botData), err => console.error);
}

function argTest(num) {
  for (var i = 0; i < num; i++) {
    if (msgArg[i] === undefined) {
      return 0;
    }
  }
  return 1;
}
function addLine(str) {
  msgToSend += str + '\n';
}

function genColor(hue) {
  return hsvToRgb(hue ,0.2, 0.9);
}
function hsvToRgb(h, s, v) {
  var r, g, b;

  var i = Math.floor(h * 6);
  var f = h * 6 - i;
  var p = v * (1 - s);
  var q = v * (1 - f * s);
  var t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0: r = v, g = t, b = p; break;
    case 1: r = q, g = v, b = p; break;
    case 2: r = p, g = v, b = t; break;
    case 3: r = p, g = q, b = v; break;
    case 4: r = t, g = p, b = v; break;
    case 5: r = v, g = p, b = q; break;
  }
  return '#' + Math.floor(r*255).toString(16) + Math.floor(g*255).toString(16) + Math.floor(b*255).toString(16);
}

bot.login(token);
