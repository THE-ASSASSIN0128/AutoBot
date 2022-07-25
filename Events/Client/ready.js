const mongoose = require("mongoose");
const DataBase = process.env["DataBase"];
const ascii = require("ascii-table");
const {
  guilds,
  channels,
  colour,
  bot
} = require(`${process.cwd()}/config.json`);
const {
  EmbedBuilder,
  WebhookClient
} = require("discord.js");
const {
  version
} = require(`${process.cwd()}/package.json`);


module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
    let guild = await client.guilds.cache.get(guilds.main);
    let channel = await guild.channels.fetch(channels.status);

    const Status = new EmbedBuilder()
      .setTitle("Bot is Online")
      .setDescription(`To make some upgrades or to fix some bugs the bot was offline. Now the bot is online again.`)
      .setThumbnail(`${client.user.avatarURL({
        dynamic : true,
        size : 4096
      })}`)
      .setColor(colour.bot)
      .setFooter({
        text: `${client.user.username} | V•${version}`,
        iconURL: `${client.user.avatarURL({
          dynamic: true,
          size: 4096
        })}`
      })
      .setTimestamp()

    channel.send({
      embeds: [Status]
    });
    
		console.log(`Ready! Logged in as ${client.user.tag}`);
    client.user.setPresence({
      activities: [{
        type: "LISTENING",
        name: "/help"
      }],
      status: 5
    });
    const Table = new ascii("Bot's Information");
    
    Table.addRow("tag", `${client.user.tag}`);
    Table.addRow("id", `${client.user.id}`);
    Table.addRow("prefix", `${bot.prefix}`);
    Table.addRow("guild(s)", `${client.guilds.cache.size}`);

    
    console.log(Table.toString());
    
    
    if (!DataBase) return;
    try {
      mongoose.connect(DataBase,{
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      console.log("[🟢 DataBase] connected")
    } catch (err) {
      console.error(err)
    };
	},
};