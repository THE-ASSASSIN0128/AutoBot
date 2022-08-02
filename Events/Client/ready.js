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
    
    client.user.setPresence({
      activities: [{
        name: "/help"
      }],
      status: "idle"
    });
    const Table = new ascii("Bot's Information");
    
    Table.addRow("tag", `${client.user.tag}`);
    Table.addRow("id", `${client.user.id}`);
    Table.addRow("prefix", `${bot.prefix}`);
    Table.addRow("guild(s)", `${client.guilds.cache.size}`);

    
    console.log(Table.toString(), `\nReady! Logged in as ${client.user.tag}`);
    
    
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