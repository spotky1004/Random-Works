const Discord = require('discord.js');
const fs = require('fs');
const userData = require("./botData.json");
//const math = require("./module.js");
const { create, all } = require("mathjs")
const math = create(all);
math.config({ number: 'BigNumber', precision: 15});
let userDataD = JSON.stringify(userData);
fs.writeFile('./botData.json', userDataD, err => console.error);
const bot = new Discord.Client();

const token = 'I ate token';

bot.on('ready', () => {
  console.log('online!');
  let logChannel2 = bot.channels.cache.get('740368062280106044');
  logChannel2.send('숩버 온라인!');
  msgLogCount = 0;
  lastAuthor = 0;
  bommed = 0;
  backupTime = new Date().getTime();
  setVar();
  sessionData = {};
})

bot.on('message', msg=>{
  if (msg.author.bot) return;
  if (bommed) return;
  if (msg.author.id == 740505181594189864 || !(msg.channel.id == 740368062280106044 || msg.channel.id == 741612121074434119 || msg.channel.id == 697389133361971315 || msg.channel.id == 721197759012536391 || msg.channel.id == 727765114912112640 || msg.channel.id == 790492786470027294 || msg.channel.id == 697389080153030670 || msg.guild === null)) {
    return;
  }
  if (sessionData[msg.author.id] !== undefined) {
    if (sessionData[msg.author.id].quiz == 1) return;
  }
  playerSet(msg);
  if (1) {
    for (var i = 0; i < commandRep.length; i++) {
      if (commandRep[i] == msg.content.replace('수버야 ', '') && authorData.varietyArr[300+i] == 0) {
        authorData.varietyArr[300+i] = 1;
        authorData.varietyTypeArr[3]++;
        authorData.variety++;
      }
    }
  }
  if (msg.content.startsWith('수버야 eval ')) {
    if (msg.author.id == 357504806358614035) {
      try {
        msgToSend = '```js\n' + msg.content.substr(('dev eval ').length) + '\n```\n`<- ' + eval(msg.content.substr(('dev eval ').length)) + '`';
      } catch (e) {
        msgToSend = '```js\n' + msg.content.substr(('dev eval ').length) + '\n```\n`<- ' + e + '`';
      }
      msg.channel.send(msgToSend);
    } else {
      msg.channel.send('헤에');
    }
    return;
  }
  msgToSend = '';
  if (msg.content == '수버야 도움' || msg.content == '수버야 도와줘' || msg.content == '수버야 도움말') {
    msg.channel.send("`수버야 스탯`: 여러가지 스텟을 보여줍니다\n`수버야 퀴즈`: 퀴즈를 시작합니다 (`쾅, 왘`, `ㅔ, ㅣㅏ`, `이모지`로 정답 제출 가능)\n`수버야 도감`: 도감을 보여줍니다\n`수버야 출첵`: 출첵!\n`수버야 랭킹`: 랭킹을 보여줍니다\n`수버야 힌트`: 도감에 없는 단어의 힌트를 보여줍니다 (쿨타임 60초)\n`수버야 커스텀`: 커스텀 명령을 추가합니다\n`수버야 계산해`: 계산을 해 줍니다 (여러 함수 사용 가능)\n`수버야 자폭해`: <:thrinking:737896997876662284>");
    return;
  }
  if (msg.content == '수버 일어나' || msg.content == '수버 이러나' || msg.content == '수버야 일어나' || msg.content == '수버야 이러나') {
    msg.channel.send("<:died:737676618889166888> <:gomdori:732230366114611202>").then((sentMessage) => setTimeout(() => { sentMessage.edit("<:surber:737428521777102968> <:happy_gomdori:735693167055339560>") }, 3000));
    return;
  }
  if (msg.content == '수버 잘자' || msg.content == '수버야 잘자') {
    msg.channel.send("<:surber:737428521777102968> <:happy_gomdori:735693167055339560>").then((sentMessage) => setTimeout(() => { sentMessage.edit("<:died:737676618889166888> <:gomdori:732230366114611202>") }, 3000));
    return;
  }
  if (msg.content == '수버야 랭킹') {
    msgToSend = '랭킹 이름: `수버, 버수, 퀴즈, 콤보, 도감, 자폭, 반응, 출첵`';
    msgToSend += '\nex) 수버야 랭킹 수버';
    msg.channel.send(msgToSend);
    return;
  }
  if (msg.content == '수버야 퀴즈') {
    quiz(authorData, msg);
    return;
  }
  if (msg.content.startsWith('수버야 랭킹 수버')) {
    rankArr = [];
    rankPage = Number(msg.content.substr(10, msg.content.length))-1;
    if (isNaN(rankPage) || rankPage < 0) {
      rankPage = 0;
    }
    for (const i in userData) {
      if (i == 'meta') continue;
      if (userData[i].killed !== undefined) rankArr.push([userData[i].userName, userData[i].killed]);
    }
    if (rankPage > Math.floor(rankArr.length/20)) {
      rankPage = Math.floor(rankArr.length/20);
    }
    rankArr = rankArr.sort((a, b) => b[1] - a[1]);
    msgToSend += '```js\n';
    for (var i = rankPage*20; i < Math.min(rankArr.length-rankPage*20, (rankPage+1)*20); i++) {
      msgToSend += `${i+1}. ${rankArr[i][0]} - ${rankArr[i][1]}\n`;
    }
    msgToSend += `Page ${rankPage+1}`;
    msgToSend += '```';
    msg.channel.send(msgToSend);
    return;
  }
  if (msg.content.startsWith('수버야 랭킹 버수')) {
    rankArr = [];
    rankPage = Number(msg.content.substr(10, msg.content.length))-1;
    if (isNaN(rankPage) || rankPage < 0) {
      rankPage = 0;
    }
    for (const i in userData) {
      if (i == 'meta') continue;
      if (userData[i].saved !== undefined) rankArr.push([userData[i].userName, userData[i].saved]);
    }
    if (rankPage > Math.floor(rankArr.length/20)) {
      rankPage = Math.floor(rankArr.length/20);
    }
    rankArr = rankArr.sort((a, b) => b[1] - a[1]);
    msgToSend += '```js\n';
    for (var i = rankPage*20; i < Math.min(rankArr.length-rankPage*20, (rankPage+1)*20); i++) {
      msgToSend += `${i+1}. ${rankArr[i][0]} - ${rankArr[i][1]}\n`;
    }
    msgToSend += `Page ${rankPage+1}`;
    msgToSend += '```';
    msg.channel.send(msgToSend);
    return;
  }
  if (msg.content.startsWith('수버야 랭킹 도감')) {
    rankArr = [];
    rankPage = Number(msg.content.substr(10, msg.content.length))-1;
    if (isNaN(rankPage) || rankPage < 0) {
      rankPage = 0;
    }
    for (const i in userData) {
      if (i == 'meta') continue;
      if (userData[i].variety !== undefined) rankArr.push([userData[i].userName, userData[i].variety+(userData[i].attendMsgVaritey !== undefined ? userData[i].attendMsgVaritey : 0)]);
    }
    if (rankPage > Math.floor(rankArr.length/20)) {
      rankPage = Math.floor(rankArr.length/20);
    }
    rankArr = rankArr.sort((a, b) => b[1] - a[1]);
    msgToSend += '```js\n';
    for (var i = rankPage*20; i < Math.min(rankArr.length-rankPage*20, (rankPage+1)*20); i++) {
      msgToSend += `${i+1}. ${rankArr[i][0]} - ${rankArr[i][1]}\n`;
    }
    msgToSend += `Page ${rankPage+1}`;
    msgToSend += '```';
    msg.channel.send(msgToSend);
    return;
  }
  if (msg.content.startsWith('수버야 랭킹 자폭')) {
    rankArr = [];
    rankPage = Number(msg.content.substr(10, msg.content.length))-1;
    if (isNaN(rankPage) || rankPage < 0) {
      rankPage = 0;
    }
    for (const i in userData) {
      if (i == 'meta') continue;
      if (userData[i].boom !== undefined) rankArr.push([userData[i].userName, userData[i].boom]);
    }
    if (rankPage > Math.floor(rankArr.length/20)) {
      rankPage = Math.floor(rankArr.length/20);
    }
    rankArr = rankArr.sort((a, b) => b[1] - a[1]);
    msgToSend += '```js\n';
    for (var i = rankPage*20; i < Math.min(rankArr.length-rankPage*20, (rankPage+1)*20); i++) {
      msgToSend += `${i+1}. ${rankArr[i][0]} - ${rankArr[i][1]}\n`;
    }
    msgToSend += `Page ${rankPage+1}`;
    msgToSend += '```';
    msg.channel.send(msgToSend);
    return;
  }
  if (msg.content.startsWith('수버야 랭킹 반응')) {
    rankArr = [];
    rankPage = Number(msg.content.substr(10, msg.content.length))-1;
    if (isNaN(rankPage) || rankPage < 0) {
      rankPage = 0;
    }
    for (const i in userData) {
      if (i == 'meta') continue;
      if (userData[i].react !== undefined) rankArr.push([userData[i].userName, userData[i].react]);
    }
    if (rankPage > Math.floor(rankArr.length/20)) {
      rankPage = Math.floor(rankArr.length/20);
    }
    rankArr = rankArr.sort((a, b) => b[1] - a[1]);
    msgToSend += '```js\n';
    for (var i = rankPage*20; i < Math.min(rankArr.length-rankPage*20, (rankPage+1)*20); i++) {
      msgToSend += `${i+1}. ${rankArr[i][0]} - ${rankArr[i][1]}\n`;
    }
    msgToSend += `Page ${rankPage+1}`;
    msgToSend += '```';
    msg.channel.send(msgToSend);
    return;
  }
  if (msg.content.startsWith('수버야 랭킹 퀴즈')) {
    rankArr = [];
    rankPage = Number(msg.content.substr(10, msg.content.length))-1;
    if (isNaN(rankPage) || rankPage < 0) {
      rankPage = 0;
    }
    for (const i in userData) {
      if (i == 'meta') continue;
      if (userData[i].quizLevel !== undefined) rankArr.push([userData[i].userName, userData[i].quizLevel]);
    }
    if (rankPage > Math.floor(rankArr.length/20)) {
      rankPage = Math.floor(rankArr.length/20);
    }
    rankArr = rankArr.sort((a, b) => b[1] - a[1]);
    msgToSend += '```js\n';
    for (var i = rankPage*20; i < Math.min(rankArr.length-rankPage*20, (rankPage+1)*20); i++) {
      msgToSend += `${i+1}. ${rankArr[i][0]} - ${(rankArr[i][1]).toFixed(2)}\n`;
    }
    msgToSend += `Page ${rankPage+1}`;
    msgToSend += '```';
    msg.channel.send(msgToSend);
    return;
  }
  if (msg.content.startsWith('수버야 랭킹 콤보')) {
    rankArr = [];
    rankPage = Number(msg.content.substr(10, msg.content.length))-1;
    if (isNaN(rankPage) || rankPage < 0) {
      rankPage = 0;
    }
    for (const i in userData) {
      if (i == 'meta') continue;
      if (userData[i].maxBoomChain !== undefined) rankArr.push([userData[i].userName, userData[i].maxBoomChain]);
    }
    if (rankPage > Math.floor(rankArr.length/20)) {
      rankPage = Math.floor(rankArr.length/20);
    }
    rankArr = rankArr.sort((a, b) => b[1] - a[1]);
    msgToSend += '```js\n';
    for (var i = rankPage*20; i < Math.min(rankArr.length-rankPage*20, (rankPage+1)*20); i++) {
      msgToSend += `${i+1}. ${rankArr[i][0]} - x${rankArr[i][1]}\n`;
    }
    msgToSend += `Page ${rankPage+1}`;
    msgToSend += '```';
    msg.channel.send(msgToSend);
    return;
  }
  if (msg.content.startsWith('수버야 랭킹 출첵2')) {
    rankArr = [];
    rankPage = Number(msg.content.substr(10, msg.content.length))-1;
    if (isNaN(rankPage) || rankPage < 0) {
      rankPage = 0;
    }
    for (const i in userData) {
      if (i == 'meta') continue;
      if (userData[i].attendMsgVariteyArr2 !== undefined) rankArr.push([userData[i].userName, userData[i].attendMsgVariteyArr2.length]);
    }
    if (rankPage > Math.floor(rankArr.length/20)) {
      rankPage = Math.floor(rankArr.length/20);
    }
    rankArr = rankArr.sort((a, b) => b[1] - a[1]);
    msgToSend += '```js\n';
    for (var i = rankPage*20; i < Math.min(rankArr.length-rankPage*20, (rankPage+1)*20); i++) {
      msgToSend += `${i+1}. ${rankArr[i][0]} - ${rankArr[i][1]} 개\n`;
    }
    msgToSend += `Page ${rankPage+1}`;
    msgToSend += '```';
    msg.channel.send(msgToSend);
    return;
  }
  if (msg.content.startsWith('수버야 랭킹 출첵')) {
    rankArr = [];
    rankPage = Number(msg.content.substr(10, msg.content.length))-1;
    if (isNaN(rankPage) || rankPage < 0) {
      rankPage = 0;
    }
    for (const i in userData) {
      if (i == 'meta') continue;
      if (userData[i].attendCount !== undefined) rankArr.push([userData[i].userName, userData[i].attendCount]);
    }
    if (rankPage > Math.floor(rankArr.length/20)) {
      rankPage = Math.floor(rankArr.length/20);
    }
    rankArr = rankArr.sort((a, b) => b[1] - a[1]);
    msgToSend += '```js\n';
    for (var i = rankPage*20; i < Math.min(rankArr.length-rankPage*20, (rankPage+1)*20); i++) {
      msgToSend += `${i+1}. ${rankArr[i][0]} - ${rankArr[i][1]} 일\n`;
    }
    msgToSend += `Page ${rankPage+1}`;
    msgToSend += '```';
    msg.channel.send(msgToSend);
    return;
  }
  if (msg.content.startsWith('수버야 계산해')) {
    toEval = msg.content.substr(8, msg.content.length);
    toEval = toEval.replace(/(\d+)\^{2}(\d+)/g, function(match, p1, p2){return p1 + (`^${p1}`).repeat(p2-1)});
    msgToSend = `\`\`\`js\n${toEval}\n\`\`\``
    try {
      switch (toEval) {
        case '1+1':
        msgToSend += '= `귀요미`';
          break;
        case '':
        msgToSend += '= `java`';
          break;
        default:
        msgToSend += `= \`${math.evaluate(toEval)}\``;
      }
      msg.channel.send(msgToSend);
    } catch (e) {
      msgToSend += `= error! \`${e}\``;
      msg.channel.send(msgToSend);
    }
    return;
  }
  if (msg.content == '수버야 스탯' || msg.content == '수버야 수탯') {
    msgToSend = '';
    msgToSend += '유저 <:died:737676618889166888>:`' + authorData.killed + '`\n유저 <:surber:737428521777102968>:`' + authorData.saved + '`\n글로벌 <:died:737676618889166888>: `' + userData.meta.totDeath + '`';
    if (authorData.maxBoomChain > 2) {
      msgToSend += '\n연속 쾅 콤보: `' + authorData.maxBoomChain + '`';
    }
    if (authorData.quizLevel > 0) {
      msgToSend += '\n퀴즈 레벨: `Lv.' + (authorData.quizLevel).toFixed(2) + '/' + (authorData.maxLv).toFixed(2) + '`';
    }
    msgToSend += `\n도감 갯수: \`${authorData.variety}\``
    if (authorData.boom > 0) {
      msgToSend += '\n자폭시킨 횟수: `' + authorData.boom + '`';
    }
    if (authorData.react > 0) {
      msgToSend += '\n유저 반응 <:died:737676618889166888>: `' + authorData.react + '`';
    }
    msg.channel.send(msgToSend);
    return;
  }
  if (msg.content == '수버야 도감') {
    msgToSend = `**\`${authorData.userName}\`**님의 도감`;
    msgToSend += `\`\`\`cs\n[수버] (${authorData.varietyTypeArr[0]}/${msgToChange.length}) ${(msgToChange.length <= authorData.varietyTypeArr[0]) ? 'Done!': ''}\n\`\`\``
    for (var i = 0; i < msgToChange.length; i++) {
      if (authorData.varietyArr[i] == 1) {
        msgToSend += `**\`${msgToChange[i]}\`** `;
      } else {
        msgToSend += `\`${('?').repeat(msgToChange[i].length)}\` `;
      }
      if ((i+1)%10==0 && i != 0) msgToSend += `\n`;
    }
    msgToSend += `\`\`\`cs\n[버수] (${authorData.varietyTypeArr[1]}/${changeToMsg.length}) ${(changeToMsg.length <= authorData.varietyTypeArr[1]) ? 'Done!': ''}\n\`\`\``
    for (var i = 100; i < changeToMsg.length+100; i++) {
      if (authorData.varietyArr[i] == 1) {
        msgToSend += `**\`${changeToMsg[i-100]}\`** `;
      } else {
        msgToSend += `\`${('?').repeat(changeToMsg[i-100].length)}\` `;
      }
      if ((i+1)%10==0 && i != 100) msgToSend += `\n`;
    }
    msg.channel.send(msgToSend.substr(0, 1999));
    msgToSend = '';
    msgToSend += `\`\`\`cs\n[스페셜] (${authorData.varietyTypeArr[2]}/${specialRep.length}) ${(specialRep.length <= authorData.varietyTypeArr[2]) ? 'Done!': ''}\n\`\`\``
    for (var i = 200; i < specialRep.length+200; i++) {
      if (authorData.varietyArr[i] == 1) {
        msgToSend += `**\`${specialRep[i-200][0]}\`** `;
      } else {
        msgToSend += `\`${('?').repeat(specialRep[i-200][0].length)}\` `;
      }
      if ((i+1)%10==0 && i != 200) msgToSend += `\n`;
    }
    msgToSend += `\`\`\`cs\n[명령어] (${authorData.varietyTypeArr[3]}/${commandRep.length}) ${(commandRep.length <= authorData.varietyTypeArr[3]) ? 'Done!': ''}\n\`\`\``
    for (var i = 300; i < commandRep.length+300; i++) {
      if (authorData.varietyArr[i] == 1) {
        msgToSend += `**\`${commandRep[i-300]}\`** `;
      } else {
        msgToSend += `\`${('?').repeat(commandRep[i-300].length)}\` `;
      }
      if ((i+1)%10==0 && i != 300) msgToSend += `\n`;
    }
    msg.channel.send(msgToSend.substr(0, 1999));
    return;
  }
  if (msg.content == '수버야 도감 출첵') {
    msgToSend += `\`\`\`cs\n[출첵] (${authorData.attendMsgVaritey}/${toFixed(attendPossibility)}) ${(3570467226624 == authorData.attendMsgVaritey) ? 'Done!': ''}\n\`\`\``
    for (var i = 0; i < authorData.attendMsgVaritey; i++) {
      msgToSend += `**\`${authorData.attendMsgVariteyArr[i]}\`** `;
      if ((i+1)%10==0 && i != 0) msgToSend += `\n`;
    }
    msg.channel.send(msgToSend.substr(0, 1999));
    return;
  }
  if (msg.content == '수버야 도감 출첵2') {
    msgToSend += `\`\`\`cs\n[출첵] (${authorData.attendMsgVaritey2}/${toFixed(attendPossibility)}) ${(attendPossibility == authorData.attendMsgVaritey2) ? 'Done!': ''}\n\`\`\``
    for (var i = 0; i < authorData.attendMsgVaritey2; i++) {
      msgToSend += `**\`${authorData.attendMsgVariteyArr2[i]}\`** `;
      if ((i+1)%10==0 && i != 0) msgToSend += `\n`;
    }
    msg.channel.send(msgToSend.substr(0, 1999));
    return;
  }
  if (msg.content == '수버야 도감 초기화') {
    dictReset(userData[msg.author.id], msg);
    return;
  }
  if (msg.content == '수버야 도감 출첵 초기화') {
    dictReset2(userData[msg.author.id], msg);
    return;
  }
  if (msg.content == '수버야 도감 출첵2 초기화') {
    dictReset3(userData[msg.author.id], msg);
    return;
  }
  if (msg.content == '수버야 힌트') {
    if (new Date().getTime()-authorData.hintTime < 60000) {
      msg.channel.send(`다음 힌트까지 **\`${(60-(new Date().getTime()-authorData.hintTime)/1000).toFixed(2)}\`**/\`60.00\`초 남음`);
      return;
    }
    var indexSelected = -1;
    var loopCount = 0;
    while (indexSelected == -1 && loopCount < 2000) {
      var tempIdx = Math.floor(Math.random()*400);
      if (authorData.varietyArr[tempIdx] == 0) {
        if ((0 <= tempIdx && tempIdx < msgToChange.length) || (100 <= tempIdx && tempIdx < changeToMsg.length+100) || (200 <= tempIdx && tempIdx < specialRep.length+200) || (300 <= tempIdx && tempIdx < commandRep.length+300)) {
          indexSelected = tempIdx;
          break;
        }
      } else {
        loopCount++;
        continue;
      }
    }
    if (indexSelected == -1) {
      for (var tempIdx = 0; tempIdx < 400; tempIdx++) {
        if (authorData.varietyArr[tempIdx] == 0) {
          if ((0 <= tempIdx && tempIdx < msgToChange.length) || (100 <= tempIdx && tempIdx < changeToMsg.length+100) || (200 <= tempIdx && tempIdx < specialRep.length+200) || (300 <= tempIdx && tempIdx < commandRep.length+300)) {
            indexSelected = tempIdx;
            break;
          }
        }
      }
    }
    if (indexSelected != -1) {
      var msgToSend = `\`\`\`js\n#${Math.floor(indexSelected/100)+1}-${indexSelected%100+1} Idx${indexSelected} 힌트\n\`\`\`\n`;
      if (indexSelected >= 300) {
        var strThs = commandRep[indexSelected-300];
      } else if (indexSelected >= 200) {
        var strThs = specialRep[indexSelected-200][0];
      } else if (indexSelected >= 100) {
        var strThs = changeToMsg[indexSelected-100];
      } else {
        var strThs = msgToChange[indexSelected];
      }
      var charIdx = Math.floor(Math.random()*strThs.length);
      msgToSend += '`' + ('?').repeat(charIdx) + strThs[charIdx] + ('?').repeat(strThs.length-charIdx-1) + '`';
      authorData.hintTime = new Date().getTime();
    } else {
      var tempP = [];
      for (var i = 0, l = Math.floor((attendMaxLength-1)*Math.random()+1); i < l; i++) {
        tempP.push(Math.floor(attendPos.length*Math.random()));
      }
      var tempIdx = 0;
      for (var i = 0, l = tempP.length; i < l; i++) {
        tempIdx += (tempP[i]+1)*attendPos.length**i;
      }
      var msgToSend = `\`\`\`js\n#5-${toFixed(tempIdx)} Idx${toFixed(tempIdx)}a 힌트\n\`\`\`\n`;
      msgToSend += '`';
      for (var i = 0, l = tempP.length; i < l; i++) {
        msgToSend += attendPos[tempP[i]];
      }
      msgToSend += '`';
      authorData.hintTime = new Date().getTime();
    }
    msg.channel.send(msgToSend);
    return;
  }
  if (msg.content == '수버야 자폭해') {
    msg.channel.send('💥');
    return;
  }
  if (msg.content.replace(attendRegex, '') == '수버야 ' || msg.content.replace(attendRegex, '') == '수부야 ') {
    if (new Date().getTime() > authorData.attendStamp) {
      authorData.attendCount++;
      authorData.attendStamp = new Date().getTime()+(86400000-((new Date().getTime()-3600000*15)%86400000));
      msgToSend = `\`<- ${authorData.userName}\`\n출첵 ${authorData.attendCount}일차!\n다음 출첵까지: \`${((authorData.attendStamp-new Date().getTime())/3600000).toFixed(2)} 시간 남음\``;
      if (!authorData.attendMsgVariteyArr.includes(msg.content.replace('수버야 ', ''))) {
        authorData.attendMsgVariteyArr.push(msg.content.replace('수버야 ', ''));
        authorData.attendMsgVaritey++;
      }
      msg.channel.send(msgToSend);
    } else {
      msgToSend = `\`<- ${authorData.userName}\`\n오늘 이미 출첵 하셨습니다!\n다음 출첵까지: \`${((authorData.attendStamp-new Date().getTime())/3600000).toFixed(2)} 시간 남음\``;
      msg.channel.send(msgToSend);
    }
    if (!authorData.attendMsgVariteyArr2.includes(msg.content.replace('수버야 ', '').replace('수부야 ', ''))) {
      authorData.attendMsgVariteyArr2.push(msg.content.replace('수버야 ', '').replace('수부야 ', ''));
      authorData.attendMsgVaritey2++;
    }
    return;
  }
  if (msg.content.startsWith('수버야 커스텀')) {
    var msgContext = msg.content.substr(8, msg.content.length);
    var args = msgContext.split(' ');
    var maxGen = authorData.customSlots+25;
    switch (args[0]) {
      case '추가': case '생성':
      switch (args[1]) {
        case '수버': case '버수':
        var addPoint = ((args[1] == '수버') ? 0 : 1);
        if (authorData.custom[addPoint].length < maxGen) {
          args[2] = msg.content.substr(14, 30);
          if (args[2] === '') {
            msg.channel.send(`추가할 항목을 입력해주세요\nex) 수버야 커스텀 추가 ${args[1]} 쾅`);
          } else if (args[2].includes('`')) {
            msg.channel.send(`\`는 포함 불가 문자입니다`);
          } else if (args[2].includes('\\')) {
            msg.channel.send(`\\은 포함 불가 문자입니다`);
          } else if (args[2].includes('*')) {
            msg.channel.send(`\*는 포함 불가 문자입니다`);
          } else if (args[2].includes('_')) {
            msg.channel.send(`_는 포함 불가 문자입니다`);
          } else if (args[2].includes('포함 불가 문자')) {
            msg.channel.send(`포함 불가 문자는 포함 불가 문자입니다`);
          } else if (args[2].includes('|')) {
            msg.channel.send(`|은 포함 불가 문자입니다`);
          } else if (args[2].includes('~')) {
            msg.channel.send(`~는 포함 불가 문자입니다`);
          } else if (args[2].includes('^')) {
            msg.channel.send(`^은 포함 불가 문자입니다`);
          } else if (args[2].replace(/[0-9]/g, 'NuMbEr').includes('NuMbEr')) {
            msg.channel.send(`숫자는 포함 불가 문자입니다`);
          } else if (args[2].includes('<')) {
            msg.channel.send(`<는 포함 불가 문자입니다`);
          } else if (args[2].includes('>')) {
            msg.channel.send(`>는 포함 불가 문자입니다`);
          } else if (args[2].includes(':')) {
            msg.channel.send(`:는 포함 불가 문자입니다`);
          } else if (args[2].includes('$')) {
            msg.channel.send(`$은 포함 불가 문자입니다`);
          } else if (args[2].includes('(') || args[2].includes(')') || args[2].includes('[') || args[2].includes(']')) {
            msg.channel.send(`괄호는 포함 불가 문자입니다`);
          } else if (args[2].includes('\\')) {
            msg.channel.send(`\\는 포함 불가 문자입니다`);
          } else if (args[2].includes('?')) {
            msg.channel.send(`.는 포함 불가 문자입니다`);
          } else if (args[2].includes('.')) {
            msg.channel.send(`.은 포함 불가 문자입니다`);
          } else {
            authorData.custom[addPoint].push(args[2]);
            msg.channel.send(`추가 완료! **\`[${args[1]}] - ${args[2]}\`**`);
          }
        } else {
          msg.channel.send(`최대 한도 도달! \`(${maxGen})\``);
        }
          break;
        default:
        msgToSend = '추가할 항목의 제목을 입력해주세요 (`수버`, `버수`)\nex) 수버야 추가 수버';
        msg.channel.send(msgToSend);
      }
        break;
      case '삭제': case '제거':
      switch (args[1]) {
        case '수버': case '버수':
        var delPoint = ((args[1] == '수버') ? 0 : 1);
        args[2] = msg.content.substr(14, 30);
        if (args[2] === undefined) {
          msg.channel.send(`제거할 항목을 입력해주세요\nex) 수버야 추가 ${args[1]} 쾅`);
        } else {
          var delIdx = findIndex(authorData.custom[delPoint], args[2]);
          if (delIdx != -1) {
            authorData.custom[delPoint].splice(delIdx, 1);
            msg.channel.send(`제거 완료! **\`[${args[1]}] - ${args[2]}\`**`);
          } else {
            msg.channel.send(`찾을 수 없습니다 **\`[${args[1]}] - ${args[2]}\`**`);
          }
        }
          break;
        default:
        msgToSend = '제거할 항목의 제목을 입력해주세요 (`수버`, `버수`)\nex) 수버야 추가 수버';
        msg.channel.send(msgToSend);
      }
        break;
      default:
      msgToSend = `**\`${authorData.userName}\`**님의 커스텀`;
      msgToSend += `\`\`\`cs\n[수버] (${authorData.custom[0].length}/${maxGen})\n\`\`\``;
      if (authorData.custom[0].length != 0) {
        for (var i = 0; i < authorData.custom[0].length; i++) {
          msgToSend += `**\`${authorData.custom[0][i]}\`** `;
          if ((i+1)%10==0 && i != 0) msgToSend += `\n`;
        }
      } else {
        msgToSend += `없음`;
      }
      msgToSend += `\`\`\`cs\n[버수] (${authorData.custom[1].length}/${maxGen})\n\`\`\``;
      if (authorData.custom[1].length != 0) {
        for (var i = 0; i < authorData.custom[1].length; i++) {
          msgToSend += `**\`${authorData.custom[1][i]}\`** `;
          if ((i+1)%10==0 && i != 0) msgToSend += `\n`;
        }
      } else {
        msgToSend += `없음`;
      }
      msg.channel.send(msgToSend);
    }
    writeSave();
    return;
  }
  /*if (msg.content == '수버야 자폭해' || msg.content.includes('<@!740505181594189864>')) {
    playerSet(msg);
    authorData.boom++;
    msg.channel.send('헤에ㅔㅔㅔㅔㅔ?');
    msgLogCount++;
    msgLog = '\n==================\n메시지 로그 - ' + msgLogCount + '\nLocaton) ' + msg.channel.name + '\nAuthor ) '  + msg.author + '/' + msg.author.username + '\nMessage Time ) ' + new Date().getTime() + '\nMessage content ) ' + msg.content + '\n==================\n';
    console.log(msgLog);
    let logChannel = bot.channels.cache.get('741612121074434119');
    logChannel.send(msgLog);
    setInterval( function () {
      asdf = asjfhoj;
    }, 3000);
    return;
  }*/
  if ((msg.content == '펑' || msg.content == '쾅') && authorData.sadStat) {
    var msgToSend = '';
    authorData.boomChain++;
    if (authorData.maxBoomChain < authorData.boomChain) authorData.maxBoomChain = authorData.boomChain;
    authorData.sadStat = 0;
    if (authorData.boomChain >= 3) msgToSend += `\`${authorData.boomChain} 콤보\`\n`;
    msgToSend += authorData.sadStr.replace(/\<\:sad:738718740245512202\>/g, '<:surber:737428521777102968>').replace(/\`(.*)\`/, '');
    while (msgToSend.includes('<:surber:737428521777102968>')) {
      if (Math.random() < 0.9) {
        regex = new RegExp('<:surber:737428521777102968>', "");
        msgToSend = msgToSend.replace(regex, '<:died:737676618889166888>');
      } else {
        regex = new RegExp('<:surber:737428521777102968>', "");
        msgToSend = msgToSend.replace(regex, '<:sad:738718740245512202>');
        authorData.sadStat = 1;
      }
    }
    authorData.sadStr = msgToSend;
    msg.channel.send(msgToSend);
    writeSave();
    return;
  }
  for (var i in sessionData) {
    if (sessionData[i].quizRunning) continue;
    if (sessionData[i].quizRunning.includes(msg.content)) {
      msg.channel.send('어뷰징 방지!');
      return;
    }
  }
  if (1) {
    authorData.boomChain = 0;
    authorData.sadStat = 0;
    msgToMsgToChangeAll = msgToMsgToChange.concat(authorData.custom[0]).concat(authorData.custom[1]);
    for (var i = 0; i < msgToMsgToChangeAll.length; i++) {
      if (msg.content.toUpperCase().includes(msgToMsgToChangeAll[i].toUpperCase()) || msg.content.replace(/수[!-힣]*버/g, '<:dinoed:737676618889166888>').includes('<:dinoed:737676618889166888>') || msg.content.replace(/버[!-힣]*수/g, '<:dinoed:737676618889166888>').includes('<:dinoed:737676618889166888>')) {
        tempMsg = msg.content;
        surberCount = 0;
        sadCount = 0;
        if (1) {
          tempCap = 0;
          for (var j = 0; j < authorData.custom[0].length; j++) {
            while (tempMsg.toUpperCase().includes(authorData.custom[0][j].toUpperCase()) && tempCap < 100) {
              regex = new RegExp(authorData.custom[0][j], "i");
              tempMsg = tempMsg.replace(regex, '<:dinoed:737676618889166888>');
              surberCount++;
              tempCap++;
            }
          }
          tempCap = 0;
          for (var j = 0; j < authorData.custom[1].length; j++) {
            while (tempMsg.toUpperCase().includes(authorData.custom[1][j].toUpperCase()) && tempCap < 100) {
              regex = new RegExp(authorData.custom[1][j], "i");
              tempMsg = tempMsg.replace(regex, '<:surbber:737428521777102968>');
              surberCount--;
              tempCap++;
            }
          }
        }
        for (var k = priorityMax; k >= 0; k--) {
          for (var j = 0; j < msgToChange.length; j++) {
            if (priorityArr[j] != k) continue;
            while (tempMsg.toUpperCase().includes(msgToChange[j].toUpperCase())) {
              if (!(authorData.varietyArr[j])) {
                authorData.varietyArr[j] = 1;
                authorData.varietyTypeArr[0]++;
                authorData.variety++;
              }
              regex = new RegExp(msgToChange[j], "i");
              tempMsg = tempMsg.replace(regex, '<:dinoed:737676618889166888>');
              surberCount++;
            }
          }
        }
        for (var k = priorityMax2; k >= 0; k--) {
          for (var j = 0; j < changeToMsg.length; j++) {
            if (priorityArr2[j] != k) continue;
            while (tempMsg.toUpperCase().includes(changeToMsg[j].toUpperCase())) {
              if (!(authorData.varietyArr[j+100])) {
                authorData.varietyArr[j+100] = 1;
                authorData.varietyTypeArr[1]++;
                authorData.variety++;
              }
              regex = new RegExp(changeToMsg[j], "i");
              tempMsg = tempMsg.replace(regex, '<:surber:737428521777102968>');
              surberCount--;
            }
          }
        }
        tempMsg = tempMsg.replace(/버[!-힣]*수/g, '<:surber:737428521777102968>');
        tempMsg = tempMsg.replace(/수[!-힣]*버/g, '<:dinoed:737676618889166888>');
        tempMsg = tempMsg.replace(/<:dinoed:737676618889166888>/g, '<:died:737676618889166888>');
        tempMsg = tempMsg.replace(/\\/g, '').replace(/\`/g, '');
        if (tempMsg.length > 2000) {
          tempMsg = tempMsg.slice(0, 1999);
        }
        authorData.sadStat = 0;
        for (var k = priorityMax3; k >= 0; k--) {
          for (var i = 0; i < specialRep.length; i++) {
            if (priorityArr3[i] != k) continue;
            if (!(msg.content.toUpperCase().includes(specialRep[i][0].toUpperCase()))) continue;
            if (!(authorData.varietyArr[i+200])) {
              authorData.varietyArr[i+200] = 1;
              authorData.varietyTypeArr[2]++;
              authorData.variety++;
            }
            regex = new RegExp(specialRep[i][0].toUpperCase(), "gi");
            tempMsg = tempMsg.replace(regex, specialRep[i][1]);
          }
        }
        while (tempMsg.includes('<:died:737676618889166888>')) {
          if (Math.random() < 0.9) {
            regex = new RegExp('<:died:737676618889166888>', "");
            tempMsg = tempMsg.replace(regex, '<:dinoed:737676618889166888>');
          } else {
            regex = new RegExp('<:died:737676618889166888>', "");
            tempMsg = tempMsg.replace(regex, '<:sad:738718740245512202>');
            lastAuthor = msg.author.id;
            authorData.sadStat = 1;
          }
        }
        if (surberCount >= 70) surberCount = 70;
        if (surberCount <= -70) surberCount = -70;
        if (surberCount >= 5) {
          msg.react('737428521777102968');
          const filter = (reaction, user) => {
      	    return ['surber'].includes(reaction.emoji.name) && user.id === msg.author.id;
          };
          msg.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
      	  .then(collected => {
      		  const reaction = collected.first();
            //msg.reactions.cache.get('737428521777102968').remove().catch(error => console.error('Failed to remove reactions: ', error));
      		  if (reaction.emoji.name === 'surber') {
              userData[msg.author.id].react++;
              msg.react('737676618889166888');
              writeSave();
      		  }
        	})
          .catch(collected => {
            //msg.reactions.cache.get('737428521777102968').remove().catch(error => console.error('Failed to remove reactions: ', error));
      	  });
        }
        //740368062280106044
        tempMsg = tempMsg.replace(/<:dinoed:737676618889166888>/g, '<:died:737676618889166888>');
        tempMsg = tempMsg.replace(/<:surbber:737428521777102968>/g, '<:surber:737428521777102968>');
        authorData.sadStr = tempMsg;
        lastMessage = tempMsg;
        msgLogCount++;
        if (msg.channel.id == 740368062280106044) {
          msgLog = '\n==================\n메시지 로그 - ' + msgLogCount + '\nLocaton) ' + msg.channel.name + '\nAuthor ) '  + msg.author + '/' + msg.author.username + '\nMessage Time ) ' + new Date().getTime() + '\nMessage content ) ' + msg.content.replace(/<@444674062237564928>/g, '') + '\n==================\n';
        } else {
          msgLog = '\n==================\n메시지 로그 - ' + msgLogCount + '\nLocaton) ' + msg.channel.name + '\nAuthor ) '  + msg.author + '/' + msg.author.username + '\nMessage Time ) ' + new Date().getTime() + '\nMessage content ) null\n==================\n';
        }
        msg.channel.send(tempMsg);
        authorData.killed += surberCount;
        if (surberCount < 0) {
          authorData.saved += -surberCount;
        }
        userData.meta.totDeath += surberCount;
        break;
      }
    }
  }
  //dev test
  if (msg.author.id == 357504806358614035) {

  }
  writeSave();
})

async function quiz(tempAuthorData, tempMsg) {
  if (sessionData[tempMsg.author.id] === undefined) sessionData[tempMsg.author.id] = {};
  sessionData[tempMsg.author.id].quiz = 1;
  var qLv = tempAuthorData.quizLevel;
  var queStr = '';
  var ansStr = '';
  queStr += `\`-> ${tempAuthorData.userName} Lv.${(tempAuthorData.quizLevel).toFixed(2)}\`\n`;
  var ansLeng = Math.min(Math.floor(Math.random()*Math.sqrt(tempAuthorData.quizLevel/2))+2+Math.sqrt(tempAuthorData.quizLevel/2), 20);
  for (var i = 0; i < ansLeng; i++) {
    var skipRev = 0;
    if (tempAuthorData.quizLevel > 300 &&  Math.min(tempAuthorData.quizLevel/300-1, 0.33) > Math.random()) {
      var idxThis = Math.floor(Math.random()*Math.min(Math.floor(specialRep.length*Math.min(tempAuthorData.quizLevel/10-30, 1)), specialRep.length));
      skipRev = 1;
      var strToAdd = [specialRep[idxThis][1], specialRep[idxThis][0]];
    } else if (0.5 < Math.random()) {
      var idxThis = Math.floor(Math.random()*Math.min(Math.floor(msgToChange.length*Math.min(tempAuthorData.quizLevel/30, 1)), msgToChange.length));
      var strAddPart = msgToChange[idxThis]
      .replace('숩숩', '숩')
      .replace('<:blank:741195249677893713>', '숩')
      .replace('https://www.youtube.com/channel/UCU6NP7WqOb3IzHnMcIKt8Rw', '숩')
      .replace('https://discord.gg/TXjkUM7', '숩')
      .replace('뻐', '숩')
      .replace('수숩', '숩')
      .replace("숩뻐", "숩")
      var strToAdd = [strAddPart, 0];
    } else {
      var idxThis = Math.floor(Math.random()*Math.min(Math.floor(changeToMsg.length*Math.min(tempAuthorData.quizLevel/30, 1)), msgToChange.length));
      var strAddPart = changeToMsg[idxThis];
      var strToAdd = [strAddPart, 1];
    }
    if (tempAuthorData.quizLevel < 15) strToAdd[0] += ' ';
    if (!skipRev) {
      if (tempAuthorData.quizLevel > 150 && Math.min(tempAuthorData.quizLevel/300-0.5, 0.15) > Math.random()) {
        strToAdd[0] = ` \`${strToAdd[0]}\` `;
        strToAdd[1] ^= 1;
      }
    }
    if (tempAuthorData.quizLevel > 250 && Math.min(tempAuthorData.quizLevel/125-2, 0.5) > Math.random()) {
      strToAdd[0] = ` ||${strToAdd[0]}|| `;
    }
    //0 = 쾅, 1 = 왘
    queStr += strToAdd[0];
    if (!skipRev) {
      ansStr += ((strToAdd[1]) ? '왘' : '쾅');
    } else {
      ansStr += strToAdd[1];
    }
  }
  queStr += `\n제한 시간: \`${(ansLeng*Math.max(4-tempAuthorData.quizLevel/100, 2)+(10-tempAuthorData.quizLevel/3000)).toFixed(1)}\`초`;
  if (tempAuthorData.quizLevel > 150) {
    queStr += `\n마크업 매뉴얼 - \`반대로\``
  }
  if (tempAuthorData.quizLevel > 250) {
    queStr += ` ||방해||`
  }
  if (tempAuthorData.quizLevel > 300) {
    queStr += ` 스페셜`
  }
  sessionData[tempMsg.author.id].quizRunning = queStr;
  await tempMsg.channel.send(queStr);
  var failLevel = Math.max(Math.min(1/Math.sqrt(tempAuthorData.quizLevel), 1), 0.2+tempAuthorData.quizLevel/1000);
  tempMsg.channel.awaitMessages(m => m.author.id == tempMsg.author.id, {max: 1, time: ansLeng*Math.max(4000-tempAuthorData.quizLevel*10, 2000)+(10000-tempAuthorData.quizLevel/3), errors: ['time']})
  .then(collected => {
    if (collected.first().author.id == 357504806358614035 && collected.first().content == '스킵') {
      tempMsg.channel.send(`\`-> ${tempAuthorData.userName} Lv.${(tempAuthorData.quizLevel).toFixed(2)} -> ${(tempAuthorData.quizLevel+1).toFixed(2)}\`\n` + '스킵!');
      tempAuthorData.quizLevel++;
    } else if (collected.first().content.replace(/ㅔ/g, '쾅').replace(/ㅣㅏ/g, '왘').replace(/수버/g, '쾅').replace(/버수/g, '왘').replace(/\> /g, '>').replace(/<:died:737676618889166888>/g, '쾅').replace(/<:surber:737428521777102968>/g, '왘') == ansStr) {
      tempMsg.channel.send(`\`-> ${tempAuthorData.userName} Lv.${(tempAuthorData.quizLevel).toFixed(2)} -> ${(tempAuthorData.quizLevel+1).toFixed(2)}\`\n` + '정답!');
      tempAuthorData.quizLevel++;
    } else {
      tempMsg.channel.send(`\`-> ${tempAuthorData.userName} Lv.${(tempAuthorData.quizLevel).toFixed(2)} -> ${Math.max(tempAuthorData.quizLevel-failLevel, 1).toFixed(2)}\`\n` + '땡!' + `\n정답: \`${ansStr}\``);
      tempAuthorData.quizLevel = Math.max(tempAuthorData.quizLevel-failLevel, 1);
    }
    sessionData[tempMsg.author.id].quiz = 0;
    if (tempAuthorData.quizLevel > tempAuthorData.maxLv) tempAuthorData.maxLv = tempAuthorData.quizLevel;
    return;
  })
  .catch(() => {
    tempMsg.channel.send(`\`-> ${tempAuthorData.userName} Lv.${(tempAuthorData.quizLevel).toFixed(2)} -> ${Math.max(tempAuthorData.quizLevel-failLevel, 1).toFixed(2)}\`\n` + '시간 초과!' + `\n정답: \`${ansStr}\``);
    tempAuthorData.quizLevel = Math.max(tempAuthorData.quizLevel-failLevel, 1);
    sessionData[tempMsg.author.id].quiz = 0;
  });
}
async function dictReset(tempAuthorData, tempMsg) {
  await tempMsg.channel.send('정말로 초가화 하시겠습니까? (y/n)');
  tempMsg.channel.awaitMessages(m => m.author.id == tempMsg.author.id, {max: 1, time: 10000, errors: ['time']})
  .then(collected => {
    if (collected.first().content == 'y') {
      tempAuthorData.varietyArr = new Array(400).fill(0);
      for (var i = 0; i < tempAuthorData.varietyTypeArr.length; i++) {
        tempAuthorData.varietyTypeArr[i] = 0;
      }
      tempAuthorData.variety = 0;
      collected.first().channel.send('초기화 완료');
    } else {
      collected.first().channel.send('초기화 취소됨');
    }
  })
  .catch(() => {
    collected.first().channel.send('초기화 취소됨');
  });
}
async function dictReset2(tempAuthorData, tempMsg) {
  await tempMsg.channel.send('정말로 초가화 하시겠습니까? (y/n)');
  tempMsg.channel.awaitMessages(m => m.author.id == tempMsg.author.id, {max: 1, time: 10000, errors: ['time']})
  .then(collected => {
    if (collected.first().content == 'y') {
      tempAuthorData.attendMsgVariteyArr = [];
      tempAuthorData.attendMsgVaritey = 0;
      collected.first().channel.send('초기화 완료');
    } else {
      collected.first().channel.send('초기화 취소됨');
    }
  })
  .catch(() => {
    collected.first().channel.send('초기화 취소됨');
  });
}
async function dictReset3(tempAuthorData, tempMsg) {
  await tempMsg.channel.send('정말로 초가화 하시겠습니까? (y/n)');
  tempMsg.channel.awaitMessages(m => m.author.id == tempMsg.author.id, {max: 1, time: 10000, errors: ['time']})
  .then(collected => {
    if (collected.first().content == 'y') {
      tempAuthorData.attendMsgVariteyArr2 = [];
      tempAuthorData.attendMsgVaritey2 = 0;
      collected.first().channel.send('초기화 완료');
    } else {
      collected.first().channel.send('초기화 취소됨');
    }
  })
  .catch(() => {
    collected.first().channel.send('초기화 취소됨');
  });
}

function findIndex(arr, toFind) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] == toFind) {
      return i;
    }
  }
  return -1;
}
function toFixed(x) {
  if (Math.abs(x) < 1.0) {
    var e = parseInt(x.toString().split('e-')[1]);
    if (e) {
        x *= Math.pow(10,e-1);
        x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
    }
  } else {
    var e = parseInt(x.toString().split('+')[1]);
    if (e > 20) {
        e -= 20;
        x /= Math.pow(10,e);
        x += (new Array(e+1)).join('0');
    }
  }
  return x;
}

function setVar() {
  priorityMax = 3;
  priorityArr = [
    0, 0, 3, 0, 0,
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 2,
    2, 0, 0, 1, 1,
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 2,
    0, 2, 0, 0, 0,
    0, 1, 0, 0, 0,
    3, 0, 0
  ];
  //히ㅣ히히ㅣ힣ㅎ힣ㅎ히히힣히히ㅣㅣㅣ히히ㅣㅎ
  msgToChange = [
    '<:surber:737428521777102968>', '쾅', '<:sad:738718740245512202>', '내부 헤에로 과부하!', '내부 헤에로 과부하',
    '헤에', 'surber', '수버', '숩버', 'tnqj',
    '숩숩', '<:blank:741195249677893713>', 'sad', '녀귣ㄱ', '수버핑',
    '수버역할핑', '모니터', '숩어', 'SurberHD_', 'SurberHD',
    '💻', '술버', 'monitor', '숩뻐', '숩',
    '스윽', '슥', '수뻐', '뻐', 'ㅔ',
    'Ｓｕｒｂｅｒ', '-수-', '<#740368062280106044>', '콩', 'zhkd',
    '밥부', '바부', 'ㄴㅁㅇ', 'babo', '🖥️',
    '과부하', 'blank', 'https://discord.gg/TXjkUM7', 'desktop', '!rank',
    'https://www.youtube.com/channel/UCU6NP7WqOb3IzHnMcIKt8Rw', '컴퓨터실', '스우마', '드보키', '터퓨컴',
    'ⓢⓤⓡⓑⓔⓡ', 'rebus', '재천', '🇸 🇺 🇷 🇧 🇪 🇷', 'deid',
    'ㅇ댱', '수숩', '␚', '– – · 　· · · · 　· – – 　–', '⠠⠍⠘⠎',
    '쑵', '쑵어', '쑤버', '<#790492786470027294>', '@everyone',
    '수버야 삭val', '지옥참마도', "꽝"
  ];
  priorityMax2 = 1;
  priorityArr2 = [
    0, 0, 0, 1, 1,
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 1,
    1, 0, 0, 0, 0,
    0, 0
  ];
  changeToMsg = [
    '<:died:737676618889166888>', 'died', '버수', '⌨️', '하부과',
    'jqnt', 'rebrus', 'ㄱ듀견', 'suber', 'rotinom',
    '터니모', 'JnL', 'ㅣㅏ', 'ｒｅｂｒｕＳ', '왘',
    'ㅓ붓', '옼', 'dkhz', '천재', '에헤',
    '얃ㅇ', '녀ㅠㄷㄱ', 'genius', '버스', 'knalb',
    'das', '긋', 'ㅇㅁㄴ', 'obab', '<#770616166200770570>',
    'potksed', '마우스', '키보드', '컴퓨터', '윽스',
    '🇷 🇪 🇧 🇷 🇺 🇸', 'ⓡⓔⓑⓡⓤⓢ', '🖱️', '· – – 　– 　– – · 　· · · ·', '⠘⠎⠠⠍',
    'ꓤꓱꓭꓤꓵꓢ', '@here'
  ];
  priorityMax3 = 2;
  priorityArr3 = [
    0, 0, 0, 0, 0,
    0, 0, 1, 0, 0,
    0, 1, 0, 0, 1,
    0, 1, 0, 1, 0,
    0, 0, 0, 0, 0,
    2, 0, 0
  ];
  specialRep = [
    ['수부', '<:subu:768798693595676682>'], ['곰돌이', '<:gomdori:732230366114611202>'], ['angry', '<:angry_:757632529367826514>'], ['haee', '<:haee:729334801395482634>'], ['<:thrinking:737896997876662284>', '<:thonking:737896985524174998>'],
    ['<:thonking:737896985524174998>', '<:thrinking:737896997876662284>'], ['감자', '<:potato_:773004372325957642>'], ['슬픈곰도리', '<:sad_gomdori:732230445051281418>'], ['ssaadd', '<:sad:757632588172230806>'], ['no signal', '<:no_signal:718034910903795752>'],
    ['펑', '<:explosion:717421644150210621>'], ['해피곰도리', '<:happy_gomdori:735693167055339560>'], ['h bot', '<:abrandhewh:772341509156241439>'], ['gniknirht', '<:gniknirht:773356241573380108>'], ['수저', '<:spoon:788724947220561940>'],
    ['나무', '<:SpotkyTree:759940404433911809>'], ['와', '<:__:790374944554352670>'], ['sans', '<:2_:790375501456867360>'], ['수조', '<:SuJo:794841189357453322>'], ['수', '<:Sur:796740357781585920>'],
    ['버', '<:Ber:796740357274075217>'], ['ㅅ', '<:tSurber:797377396818182184>'], ['ㅜ', '<:nSurber:797377395379404827>'], ['ㅂ', '<:qSurber:797377395602620446>'], ['ㅓ', '<:jSurber:797377395475611648>'],
    ['곰돌이쓰담', '<a:patTheGomdori:830261801903718451>'], ["부", "<:bu:833991212125519873>"], ["샌즈", "<a:Sans:790375501801062410>"]
  ];
  commandRep = [
    '도움', '도와줘', '도움말', '수버 일어나', '수버 이러나',
    '일어나', '이러나', '수버 잘자', '잘자', '랭킹',
    '랭킹 수버', '랭킹 버수', '랭킹 도감', '스탯', '수탯',
    '도감', '펑', '쾅', '자폭해', 'eval',
    '계산해', '힌트', '랭킹 자폭', '랭킹 반응', '퀴즈',
    '랭킹 퀴즈', '도감 초기화', '커스텀', '커스텀 추가', '커스텀 삭제',
    '랭킹 콤보', '출첵', '출첵해', '랭킹 출첵', '출ㄹ첵',
    '도감 출첵', '도감 출첵 초기화', '도감 출첵2', '도감 출첵2 초기화', '수부야 출첵'
  ];
  msgToMsgToChange = msgToChange.concat(changeToMsg);
  for (var i = 0; i < specialRep.length; i++) {
    msgToMsgToChange.push(specialRep[i][0]);
  }
  attendPos = [
    'ㅊ', 'ㅜ', 'ㄹ', 'ㅊ', 'ㅔ', 'ㄱ',
    '추', '루', '구', '체', '레', '게',
    '춫', '룿', '궃', '쳋', '렟', '겣',
    '출', '룰', '굴', '첼', '렐', '겔',
    '축', '룩', '국', '첵', '렉', '겍',
    '춝', '룱', '굵', '첽', '렑', '겕',
    '췌', '뤠', '궤', '췕', '뤩', '궭',
    '췣', '궻', '뤷', '췔', '뤨', '궬',
    '췍', '뤡', '궥',
    'ㄺ', 'ㅞ',
    'c', 'n', 'f', 'p', 'r'
  ];
  attendMaxLength = 20;
  attendRegex = new RegExp(`[${attendPos.toString().replace(/,/g, '')}]{1,${attendMaxLength}}`, '');
  attendPossibility = 0;
  for (var i = 1; i < attendMaxLength+1; i++) {
    attendPossibility += attendPos.length**i;
  }
}
function playerSet(msg) {
  if (userData[msg.author.id] === undefined) {
    userData[msg.author.id] = {}
  }
  authorData = userData[msg.author.id];
  playerVarCheck();
  authorData.userName = msg.author.username;
}
function playerVarCheck() {
  varToCheck = [
    'killed', 'saved', 'boom', 'react', 'variety',
    'varietyArr', 'varietyTypeArr', 'hintTime', 'quizLevel', 'maxLv',
    'custom', 'customSlots', 'sadStr', 'sadStat', 'boomChain',
    'maxBoomChain', 'attendStamp', 'attendCount', 'globalVarietyArr', 'attendMsgVariteyArr',
    'attendMsgVaritey', 'attendMsgVariteyArr2', 'attendMsgVaritey2'
 ];
  varToReset = [
    0, 0, 0, 0, 0,
    new Array(400).fill(0), [0, 0, 0, 0], 0, 1, 0,
    [[], []], 0, '', 0, 0,
    0, 0, 0, [[], []], [],
    0, [], 0
  ];
  for (var i = 0; i < varToCheck.length; i++) {
    if (authorData[varToCheck[i]] === undefined) {
      authorData[varToCheck[i]] = varToReset[i];
    }
  }
}
function writeSave() {
  fs.writeFile('./botData.json', JSON.stringify(userData), err => console.error);
  if ((new Date().getTime())-backupTime >= 180000) {
    fs.writeFile('./Backups/userDataBackup' + new Date().getTime() + '.json', JSON.stringify(userData), err => console.error);
    backupTime = new Date().getTime();
  }
}

bot.login(token);