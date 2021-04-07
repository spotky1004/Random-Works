const Discord = require('discord.js');
const bot = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'USER'] });
const token = 'token';
const fs = require('fs');
const userData = require("./userData.json");
let userDataD = JSON.stringify(userData);
fs.writeFile('./userData.json', userDataD, err => console.error);

bot.on('ready', () => {
  backupTime = 0;
  console.log('online!');
  varSet();
  writeSave();
  startMaze([8+fRand(4),8+fRand(4)], '769588504794759179', 0);
  setInterval( function () {
    doTick();
  }, 10000);
})

bot.on('message', msg=>{
  if (msg.author.bot) return;
  tNow = new Date().getTime();
  msgArg = msg.content.split(' ');
  command = msgArg[0].toLowerCase();
  msgArg = msgArg.splice(1, msgArg.length);
  msgToSend = '';
  if (userData[msg.author.id] === undefined) {
    userData[msg.author.id] = {"timeStarted" : tNow}
  }
  authorData = userData[msg.author.id];
  playerVarCheck();
  authorData.userName = msg.author.username;
  switch (command) {
    case 'dev':
    if (msg.author.id == "ID") {
      switch (msgArg[0]) {
        case 'eval':
        try {
          msgToSend = '```js\n' + msg.content.substr(('dev eval ').length) + '\n```\n`<- ' + eval(msg.content.substr(('dev eval ').length)) + '`';
        } catch (e) {
          msgToSend = '```js\n' + msg.content.substr(('dev eval ').length) + '\n```\n`<- ' + e + '`';
        }
          break;
        default:
        msgToSend = '.';
      }
      break;
    } else {
      msgToSend = 'missing permission!';
    }
      break;
    default:
    switch (msg.channel.id) {
      case '769589594877984788':
      for (var i = 0; i < 2; i++) {
        msg.react(locationEmoji[i]);
      }
      const filter = (reaction, user) => {
      	return locationEmoji.includes(reaction.emoji.name) && user.id === msg.author.id;
      };
      msg.awaitReactions(filter, { max: 1, time: 30000, errors: ['time'] })
      .then(collected => {
        const reaction = collected.first();
        indexThis = findIndex(locationEmoji, reaction.emoji.name);
        authorData.roadStatus[0] = indexThis;
        authorData.roadStatus[1] = locationTime[indexThis];
        bot.guilds.cache.get('769578597101862922').members.cache.get(msg.author.id).roles.remove('769588686286618655');
        bot.guilds.cache.get('769578597101862922').members.cache.get(msg.author.id).roles.add('769589255079985193');
        msg.delete();
        writeSave();
      })
      .catch(collected => {
        msg.delete();
      });
        break;
      case '769589795621568553':
      switch (command) {
        case 'status': case 's':
        msgToSend = new Discord.MessageEmbed()
        .setColor('#636769')
        .attachFiles(['Images/Road.png'])
        .setAuthor('Road', 'attachment://Road.png')
        .setDescription(`${perBar(1-(authorData.roadStatus[1]/locationTime[authorData.roadStatus[0]]))}\n\`${(authorData.roadStatus[1]/6).toFixed(2)}\` mins left without run`);
        msg.reply(msgToSend)
        .then(msg => {
          msg.delete({ timeout: 10000 });
        })
        msgToSend = '';
          break;
        case 'run': case 'r':
        authorData.runStatus = 6;
        msg.reply('Run for 60 sec!')
        .then(msg => {
          msg.delete({ timeout: 5000 });
        })
          break;
      }
      msg.delete();
        break;
      case '769589684107608086':
      switch (command) {
        case 'back': case 'b':
        indexThis = 5;
        authorData.roadStatus[0] = indexThis;
        authorData.roadStatus[1] = locationTime[indexThis];
        bot.guilds.cache.get('769578597101862922').members.cache.get(msg.author.id).roles.remove('769589090026782732');
        bot.guilds.cache.get('769578597101862922').members.cache.get(msg.author.id).roles.add('769589255079985193');
          break;
      }
        break;
      case '769589923102588948':
      switch (command) {
        case 'back': case 'b':
        indexThis = 5;
        authorData.roadStatus[0] = indexThis;
        authorData.roadStatus[1] = locationTime[indexThis];
        bot.guilds.cache.get('769578597101862922').members.cache.get(msg.author.id).roles.remove('769589151838109696');
        bot.guilds.cache.get('769578597101862922').members.cache.get(msg.author.id).roles.add('769589255079985193');
          break;
      }
        break;
      default:
    }
  }
  if (msgToSend != '') {
    msg.channel.send(msgToSend);
  }
  writeSave();
});
async function doTick() {
  for (var i in userData) {
    authorData = userData[i];
    if (userData[i].roadStatus !== undefined) {
      if (userData[i].roadStatus[0] != -1) {
        userData[i].roadStatus[1] -= (authorData.runStatus > 0) ? 2 : 1;
        authorData.runStatus--;
        if (userData[i].roadStatus[1] <= 0) {
          userData[i].roadStatus[0] = -1;
          await bot.guilds.cache.get('769578597101862922').members.cache.get(i).roles.remove('769589255079985193');
          await bot.guilds.cache.get('769578597101862922').members.cache.get(i).roles.add(locationRole[userData[i].roadStatus[0]]);
        }
      }
    }
  }
}

bot.on('messageReactionAdd', async (reaction, author) => {
  if (author.id == '769580871329251368') return;
  switch (reaction.message.channel.id) {
    case '769593912259903519':
    if (reaction._emoji.name == '🌲') {
      bot.guilds.cache.get('769578597101862922').members.cache.get(author.id).roles.add('769588308640268348');
    }
      break;
    case '769588504794759179':
    playerDir[0][author.id] = findIndex(dirEmoji, reaction._emoji.name);
    const userReactions = reaction.message.reactions.cache.filter(reaction => reaction.users.cache.has(author.id));
    try {
      for (const reaction of userReactions.values()) {
        await reaction.users.remove(author.id);
      }
    } catch (e) {
      console.error('Failed to remove reactions.');
    }
      break;
    default:

  }
});

bot.on('guildMemberAdd', async newMember => {
  bot.channels.cache.get('769578597101862925').send(`Hi ${newMember.toString()}! Welcome to Tree Tower.\nMember Count: \`${bot.guilds.cache.reduce((a, g) => a + g.memberCount, 0)}\``);
  for (var i = 0; i < sectionRole.length; i++) {
    newMember.roles.add(sectionRole[i]);
  }
  newMember.roles.add('769588686286618655');
  newMember.roles.add('769581771976081440');
});

function varSet() {
  sectionRole = [
    '769588132982947860',
    '769588605555179568',
    '769588172429459457'
  ];
  locationEmoji = [
    '🏞️',
    '🛒',
    '',
    '',
    '',
    ''
  ];
  locationRole = [
    '769589090026782732',
    '769589151838109696',
    '',
    '',
    '',
    '769588686286618655'
  ];
  locationTime = [
    9,
    12,
    0,
    0,
    0,
    15
  ]
  perUnicode = ['▁', '█'];
  floorSize = [
    [10, 10]
  ];
  tileset = [
    '<:Tile:769837003348115456>', '<:Blank:769837003364761620>', '<:Start:769837003364761640>', '<:Goal:769837003352440852>', '<:Loot:769837003360829460>',
    '<:Here:770948860088418355>', '<:Yes:770948860453453854>', '<:No:770948860104540182>', '<:IronTile:770953838357774367>', 'trapTile',
    '<:Tile0:770996903395065856>', '<:Tile1:770996903159791617>', '<:Tile2:770996903663894538>', '<:Tile3:770996903692468234>', '<:Tile4:770996903134494723>',
    '<:Tile5:770996903383007262>', '<:Tile6:770996903428882452>', '<:Tile7:770996903428227102>', '<:Tile8:770996903516045353>', '<:PlayerTile:771019767754391573>',
    '', '', '', '', '',
    '<:Player:769854524138848278>', '', '', '', '',
    '', '<:PlayerYes:770951579846967328>', '', '<:PlayerIronTile:770953838479933460>', '',
    '<:PlayerTile0:770996903390216202>', '<:PlayerTile1:770996903675428935>', '<:PlayerTile2:770996903373438976>', '<:PlayerTile3:770996903499923456>', '<:PlayerTile4:770996903436877874>',
    '<:PlayerTile5:770996903705313295>', '<:PlayerTile6:770996903646068766>', '<:PlayerTile7:770996903482753045>', '<:PlayerTile8:770996903054671895>', '',
    '', '', '', '', '',
  ];
  playerDir = {
    0: {},
    1: {}
  };
  playerStatus = {
    0: {},
    1: {}
  };
  dirEmoji = [
    '⬆️',
    '⬇️',
    '⬅️',
    '➡️'
  ];
}

function writeSave() {
  fs.writeFile('./userData.json', JSON.stringify(userData), err => console.error);
  if ((new Date().getTime())-backupTime >= 180000) {
    fs.writeFile('./Backups/userDataBackup' + new Date().getTime() + '.json', JSON.stringify(userData), err => console.error);
    backupTime = new Date().getTime();
  }
}
function playerVarCheck() {
  varToCheck = [
    'coin', 'roadStatus', 'runStatus'
  ];
  varToReset = [
    0, [-1, 0], 0
  ];
  for (var i = 0; i < varToCheck.length; i++) {
    if (authorData[varToCheck[i]] === undefined) {
      authorData[varToCheck[i]] = varToReset[i];
    }
  }
}
function mineCheck(arr, pos) {
  var mine = 0;
  var mineFlag = 9;
  var x = pos[0];
  var y = pos[1];
  if (y > 0) {
    if (x > 0) if (arr[y-1][x-1] == mineFlag) mine++;
    if (arr[y-1][x] == mineFlag) mine++;
    if (x+1 < arr[1].length) if (arr[y-1][x+1] == mineFlag) mine++;
  }
  if (x > 0) if (arr[y][x-1] == mineFlag) mine++;
  if (x+1 < arr[1].length) if (arr[y][x+1] == mineFlag) mine++;
  if (y+1 < arr[0].length) {
    if (x > 0) if (arr[y+1][x-1] == mineFlag) mine++;
    if (arr[y+1][x] == mineFlag) mine++;
    if (x+1 < arr[1].length) if (arr[y+1][x+1] == mineFlag) mine++;
  }
  return mine;
}

function findIndex(arr, toFind) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] == toFind) {
      return i;
    }
  }
  return -1;
}
function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
function perBar(per=0, leng = 10) {
  var filled = Math.floor(per*leng);
  var outStr = '';
  for (var i = 0; i < leng; i++) {
    if (i < filled) {
      outStr += perUnicode[1];
    } else {
      outStr += perUnicode[0];
    }
  }
  return outStr;
}
function fRand(num) {
  return Math.floor(Math.random()*num);
}

function getMazeStr(tileArr, size) {
  var outStr = [];
  var pushDown = Math.ceil(size[1]/4)*4 - size[1];
  for (var i = 0; i < Math.ceil(size[1]/4); i++) {
    var tempOutStr = '';
    for (var j = i*4-pushDown; j < i*4+4-pushDown; j++) {
      if (j >= 0) {
        for (var k = 0; k < size[0]; k++) {
          if (tileArr[j][k] == 9) {tempOutStr += tileset[0];continue}
          tempOutStr += tileset[tileArr[j][k]];
        }
      } else {
        for (var k = 0; k < size[0]; k++) {
          tempOutStr += tileset[1];
        }
      }
      tempOutStr += '\n';
    }
    outStr.push(tempOutStr);
  }
  return outStr;
}
async function genMaze(size=[5,5], channel='769588504794759179', level=0) {
  //init
  var tileArr = [];
  for (var i = 0; i < size[1]; i++) {
    tileArr.push([]);
    for (var j = 0; j < size[0]; j++) {
      if (Math.random() < 0.1) {
        tileArr[i].push(4);
      } else {
        tileArr[i].push(0);
      }
    }
  }
  mapAttr = {
    'pointTile' : 0
  };
  //tile attr
  var totSize = size[0]*size[1];
  tileArr[size[1]-1][0] = 2;
  tileArr[0][size[0]-1] = 3;
  switch (level) {
    case 1:
    loopCount = Math.floor((Math.random(2)+3)*(totSize/25));
    for (var i = 0; i < loopCount; i++) {
      pointThis = [fRand(size[0]), fRand(size[1])];
      if (tileArr[pointThis[1]][pointThis[0]] != 0) {continue};
      tileArr[pointThis[1]][pointThis[0]] = 5;
      mapAttr.pointTile++;
    }
    loopCount = Math.floor((Math.random(2)+6)*(totSize/25));
    for (var i = 0; i < loopCount; i++) {
      pointThis = [fRand(size[0]), fRand(size[1])];
      if (tileArr[pointThis[1]][pointThis[0]] != 0) {continue};
      tileArr[pointThis[1]][pointThis[0]] = 1;
    }
      break;
    case 0:
    loopCount = Math.floor((Math.random(1)+2)*(totSize/25));
    for (var i = 0; i < loopCount; i++) {
      pointThis = [fRand(size[0]), fRand(size[1])];
      if (tileArr[pointThis[1]][pointThis[0]] != 0) {continue};
      tileArr[pointThis[1]][pointThis[0]] = 5;
      mapAttr.pointTile++;
    }
    loopCount = Math.floor((Math.random(1)+2)*(totSize/10));
    for (var i = 0; i < loopCount; i++) {
      pointThis = [fRand(size[0]), fRand(size[1])];
      if (tileArr[pointThis[1]][pointThis[0]] != 0) {continue};
      if (pointThis[0] > 2 && pointThis[1] > size[1]-2) {continue};
      tileArr[pointThis[1]][pointThis[0]] = 9;
    }
    /*for (var i = 0; i < size[1]; i++) {
      for (var j = 0; j < size[0]; j++) {
        pointThis = [j, i];
        if (tileArr[pointThis[1]][pointThis[0]] != 0) {continue};
        tileArr[pointThis[1]][pointThis[0]] = mineCheck(tileArr, pointThis)+10;
      }
    }
    for (var i = 0; i < Math.floor((size[1]+1)/3); i++) {
      for (var j = 0; j < Math.floor((size[0]+1)/3); j++) {
        pointThis = [(1+j*3)%size[0], (1+i*3)%size[1]];
        if (tileArr[pointThis[1]][pointThis[0]] != 0) {continue};
        tileArr[pointThis[1]][pointThis[0]] = mineCheck(tileArr, pointThis)+10;
      }
    }
    loopCount = Math.floor((Math.random(1)+2)*(totSize/10));
    for (var i = 0; i < loopCount; i++) {
      pointThis = [fRand(size[0]), fRand(size[1])];
      if (tileArr[pointThis[1]][pointThis[0]] != 0) {continue};
      tileArr[pointThis[1]][pointThis[0]] = mineCheck(tileArr, pointThis)+10;
    }*/
      break;
  }
  //output message
  outStr = getMazeStr(tileArr, size);
  messageID = [];
  for (var i = 0; i < outStr.length; i++) {
    let sent = await bot.channels.cache.get(channel).send(outStr[i]);
    messageID.push(sent.id);
  }
  //return
  return [tileArr, messageID, mapAttr];
}
async function startMaze(size=[5,5], channel='769588504794759179', level=0) {
  let mazeArr = await genMaze(size, channel, level);
  for (var i = 0; i < dirEmoji.length; i++) {
    await bot.channels.cache.get(channel).messages.fetch(messageID[messageID.length-1]).then(msg=>msg.react(dirEmoji[i]));
  }
  loopUpdateMaze(size, channel, level, mazeArr);
}
async function loopUpdateMaze(size=[5,5], channel='769588504794759179', level=0, mazeArr) {
  await timeout(5000);
  thisStatus = playerStatus[level];
  tileArr = mazeArr[0];
  for (var i in playerDir[level]) {
    if (thisStatus[i] === undefined) {
      thisStatus[i] = {
        'life' : 99,
        'pos': [0, Number(size[1])-1]
      };
    }
    if (thisStatus[i].life < 1) continue;
    futurePos = [Number(thisStatus[i].pos[0]), Number(thisStatus[i].pos[1])];
    switch (playerDir[level][i]) {
      case 0:
      futurePos[1]--;
        break;
      case 1:
      futurePos[1]++;
        break;
      case 2:
      futurePos[0]--;
        break;
      case 3:
      futurePos[0]++;
        break;
    }
    switch (tileArr[futurePos[1]][futurePos[0]]) {
      case 0:
      thisStatus[i].pos = futurePos;
      switch (level) {
        case 0:
        tileArr[futurePos[1]][futurePos[0]] = mineCheck(tileArr, thisStatus[i].pos)+10;
          break;
      }
        break;
      case 1:
      tileArr[futurePos[1]][futurePos[0]] = 8;
      thisStatus[i].life--;
      thisStatus[i].pos = [0, Number(size[1])-1];
        break;
      case 3:
      if (mapAttr.pointTile <= 0) {
        for (var i = 0; i < messageID.length; i++) {
          await bot.channels.cache.get(channel).messages.fetch(messageID[i]).then(msg=>msg.delete());
        }
        switch (level) {
          case 0:
          startMaze([fRand(2)+5, fRand(2)+5], channel, level);
            break;
          default:
          startMaze([5, 5], channel, level);
        }
        playerDir[level] = {};
        playerStatus[level] = {};
        return;
      }
      thisStatus[i].pos = futurePos;
        break;
      case 4:
      tileArr[futurePos[1]][futurePos[0]] = 0;
      thisStatus[i].pos = futurePos;
        break;
      case 5:
      tileArr[futurePos[1]][futurePos[0]] = 6;
      mazeArr[2].pointTile--;
      thisStatus[i].pos = futurePos;
        break;
      case 7:
      thisStatus[i].life--;
      thisStatus[i].pos = [0, Number(size[1])-1];
        break;
      case 9:
      tileArr[futurePos[1]][futurePos[0]] = 7;
      thisStatus[i].life--;
      thisStatus[i].pos = [0, Number(size[1])-1];
        break;
      default:
      thisStatus[i].pos = futurePos;
    }
    if (thisStatus[i].pos[0] < 0) thisStatus[i].pos[0] = 0;
    if (thisStatus[i].pos[1] < 0) thisStatus[i].pos[1] = 0;
    if (thisStatus[i].pos[0] > size[0]-1) thisStatus[i].pos[0] = size[0]-1;
    if (thisStatus[i].pos[1] > size[1]-1) thisStatus[i].pos[1] = size[1]-1;
    if (tileArr[futurePos[1]][futurePos[0]] == 0) tileArr[futurePos[1]][futurePos[0]] = 19;
  }
  playerDir[level] = {};
  await updateMaze(tileArr, channel, size, messageID, thisStatus);
  loopUpdateMaze(size, channel, level, mazeArr);
}
async function updateMaze(tileArr, channel, size, messageID, thisStatus) {
  tempTileArr = JSON.parse(JSON.stringify(tileArr));
  for (var i in thisStatus) {
    if (thisStatus[i].life < 1 || tempTileArr[thisStatus[i].pos[1]][thisStatus[i].pos[0]] > 24) continue;
    tempTileArr[thisStatus[i].pos[1]][thisStatus[i].pos[0]] += 25;
    if (tileset[tempTileArr[thisStatus[i].pos[1]][thisStatus[i].pos[0]]] == '') tempTileArr[thisStatus[i].pos[1]][thisStatus[i].pos[0]] = 25;
  }
  outStr = getMazeStr(tempTileArr, size);
  for (var i = 0; i < outStr.length; i++) {
    await bot.channels.cache.get(channel).messages.fetch(messageID[i]).then(msg=>msg.edit(outStr[i]));
  }
}

bot.login(token);
