// Run dotenv
require('dotenv').config();


const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = process.env.PREFIX;

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  // if (!msg.content.startsWith(prefix) || msg.author.bot) return;

	const args = msg.content.slice(prefix.length).trim().split(' ');
	const command = args.shift().toLowerCase();

  if (msg.content === 'ping') {
    msg.channel.send('pong');
  } else if (command === 'args-info') {
    if (!args.length) {
      return msg.channel.send(`You didn't provide any arguments, ${msg.author}!`);
    } else if (args[0] === 'foo') {
      return msg.channel.send('bar');
    }

    msg.channel.send(`First argument: ${args[0]}`);
  }

  if (msg.content === 'Bot?') {
    msg.channel.send('No.');
  }

  if (msg.content === 'Good bot') {
    msg.channel.send('Thank you I love you you are very handsome today.');
  }

  if (msg.content === `${prefix}bot`) {
    msg.channel.send('Hello.');
  }

  if (msg.content === `${prefix}01923921938818`) {
    msg.channel.send('equigfgweifge2if 31yt78r3*(^ 789 r729r 286 23789r756329537287%^*@(^&!#^%*( 5279 64728394237896 %9r53167843562 897 gG B8ENSFWEF85627549823h n f9826714628736127!!!@!@#!!!???!?!????????????????????????????');
  }

  if (msg.content === `${prefix}cal`) {
    var cal = [];
    for(let i=1; i<10; i++){
      let num = inWords(i);
      cal.push(`:zero::${num}:`)
    }
    
    for(let i=1; i<10; i++){
      let num = inWords(i);
      cal.push(`:one::${num}:`)
    }

    for(let i=0; i<31; i+7){
      cal.splice(2, 0, "space here")
    }
    
    msg.channel.send(`${cal}`);
  }

  if (msg.content === `${prefix}em`) {
    const exampleEmbed = new Discord.MessageEmbed()
    .setColor('#ffde59')
    .setTitle('Who\'s Free')
    .setURL('https://discord.js.org/')
    .setAuthor('Some name', 'https://i.imgur.com/cnu1Fet.png', 'https://discord.js.org')
    .setDescription('Some description here')
    .setThumbnail('https://i.imgur.com/cnu1Fet.png')
    .addFields(
      { name: 'Regular field title', value: 'Some value here' },
      { name: '\u200B', value: '\u200B' },
      { name: 'Inline field title', value: 'Some value here', inline: true },
      { name: 'Inline field title', value: 'Some value here', inline: true },
    )
    .addField('Inline field title', 'Some value here', true)
    // .setImage('https://i.imgur.com/cnu1Fet.png')
    .setTimestamp()
    .setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');

    // const reactionEmoji = msg.guild.emojis.cache.find(emoji => emoji.name === 'mon');

    msg.channel.send(exampleEmbed).then(embedMessage => {
      embedMessage.react("859086008381210634");
      embedMessage.react("859039114942087209");
      embedMessage.react("859040327972421662");
      embedMessage.react("859040340585218058");
      embedMessage.react("859040354052341780");
      embedMessage.react("859040366094974976");
      embedMessage.react("859040377461932063");
      
    });
    
  }
  
  const filter = (reaction) => {
    return reaction.emoji.name+reaction.emoji.id;
  };
  
  const collector = msg.createReactionCollector(filter);
  let day = []
  
  collector.on('collect', (reaction, user) => {
    console.log(`Collected ${reaction.emoji.name} from ${user.tag}-#${client.user.id}-+#${user.id}`);
    // console.log(msg.author.id+" & "+client.user.id)
    let userId = user.id

    var d = new Date();
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    d.setDate(d.getDate() + (1 + 7 - d.getDay()) % 7);
    console.log(d.toLocaleDateString("en-US", options));
    d.setDate(d.getDate() + (2 + 7 - d.getDay()) % 7);
    console.log(d.toLocaleDateString("en-US", options));

    // !!Currently only accepts ONE input. Set to two.????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
    // Should be infinite inputs but cancels each other out. 'Press' monday, if exists => remove monday
    // ^ done
    // What if want choose Monday of next week?? [should put date as well?]
    // Doesn't track user name properly
    if (user.tag !== "R6D9#9063"){
      switch (reaction.emoji.name){
        case 'mon5':
          removeReaction(userId)
          msg.channel.send(`Monday on from ${user.tag}`);
          if (day.includes("Monday")){
            removeDay("Monday")
          } else {
            day.push("Monday")
          }
          editEmbed(user.tag, day)
        break
        case 'tues':
          removeReaction(userId)
          msg.channel.send(`Tuesday on from ${user.tag}`);
          if (day.includes("Tuesday")){
            removeDay("Tuesday")
          } else {
            day.push("Tuesday")
          }
          editEmbed(user.tag, day)
        break
        case 'wed':
          removeReaction(userId)
          msg.channel.send(`Wednesday on from ${user.tag}`);
          if (day.includes("Wednesday")){
            removeDay("Wednesday")
          } else {
            day.push("Wednesday")
          }
          editEmbed(user.tag, day)
        break
        case 'thurs':
          removeReaction(userId)
          msg.channel.send(`Thursday on from ${user.tag}`);
          day.push("Thursday")
          editEmbed(user.tag, day)
        break
        case 'fri':
          removeReaction(userId)
          msg.channel.send(`Friday on from ${user.tag}`);
          day.push("Friday")
          editEmbed(user.tag, day)
        break
        case 'sat':
          removeReaction(userId)
          msg.channel.send(`Saturday on from ${user.tag}`);
          day.push("Saturday")
          editEmbed(user.tag, day)
        break
        case 'sun':
          msg.channel.send(`Sunday on from ${user.tag}`);
          day.push("Sunday")
          editEmbed(user.tag, day)
          break
        default:
          removeReaction(userId)
      };
    }
  });
  
  collector.on('end', collected => {
    console.log(`Collected ${collected.size} items`);
  });
  
  const removeDay = (dayItem) => {
    for( var i = 0; i < day.length; i++){ 
      if ( day[i] === dayItem) { 
          day.splice(i, 1); 
      }
    }
  }
  
  const editEmbed = (username, day) => {
    // need to add for loop for .addfields variables 
    let fieldsArray = ["name: 'Regular field title', value: 'Some value here'", "name: 'Regular field title', value: 'Some value here 2'"]
    const exampleEmbed = new Discord.MessageEmbed()
      .setColor('#ffde59')
      .setTitle('Who\'s Free')
      .setURL('https://discord.js.org/')
      .setAuthor('Some name', 'https://i.imgur.com/cnu1Fet.png', 'https://discord.js.org')
      .setDescription(`Description after the edit ${username} on ${day}`)
      .setThumbnail('https://i.imgur.com/cnu1Fet.png')
      .addFields(
        { name: 'Regular field title', value: 'Some value here' },
        { name: '\u200B', value: '\u200B' },
        { name: 'Inline field title', value: 'Some value here', inline: true },
        { name: 'Inline field title', value: 'Some value here', inline: true },
      )
      .addField('Inline field title', 'Some value here', true)
      // .setImage('https://i.imgur.com/cnu1Fet.png')
      .setTimestamp()
      .setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');

    console.log(day)

    msg.edit(exampleEmbed);

  }

  const removeReaction = async(userId) => {
    // Check ID after sent
    // console.log("after:"+userId);
    const userReactions = msg.reactions.cache.filter(reaction => reaction.users.cache.has(userId));
    try {
      for (const reaction of userReactions.values()) {
        await reaction.users.remove(userId);
      }
    } catch (error) {
      console.error('Failed to remove reactions.');
    }
  }
    
});

// var a = ['','one','two','three','four', 'five','six','seven','eight','nine','ten ','eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
// var b = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];

// function inWords (num) {
//     if ((num = num.toString()).length > 9) return 'overflow';
//     n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
//     if (!n) return; var str = '';
//     // str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + '' + a[n[1][1]]) + 'crore ' : '';
//     // str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + '' + a[n[2][1]]) + 'lakh ' : '';
//     // str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + '' + a[n[3][1]]) + 'thousand ' : '';
//     str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + a[n[4][1]]) : '';
//     str += (n[5] != 0) ? ((str != '') ? 'and' : '') + (a[Number(n[5])] || b[n[5][0]] + a[n[5][1]]) : '';
//     return str;
// }

client.login(process.env.DISCORD_TOKEN);