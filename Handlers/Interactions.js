const {
  bot,
  image,
  guilds
} = require(`${process.cwd()}/config.json`);
const {
  Routes,
  REST
} = require('discord.js');
const rest = new REST({ version: "10" }).setToken(process.env["Token"]);



function loadInteractions(client) {
  const fs = require("fs");
  const ascii = require("ascii-table");
  const Table = new ascii("slash commands")
    .setHeading("file", "status");

  const Interactions = [];
  const folders = fs
    .readdirSync(`${process.cwd()}/Interactions`)
  
  for (const folder of folders) {
    const files = fs
      .readdirSync(`${process.cwd()}/Interactions/${folder}`)
      .filter(file => file.endsWith(".js"));
    
    for (const file of files) {
      const command = require(`${process.cwd()}/Interactions/${folder}/${file}`);
      
      if (!command.name) {
        Table.addRow(file, "missing a name");
      };
      if (!command.description) {
        Table.addRow(file, "missing a description");
      };

      Table.addRow(file, "🟢loaded");
      
      client.interactions.set(command.name, command);
      Interactions.push(command);
      
      continue;
    }
  }
  (async(command) => {
    if (command.testOnly) {
      await rest.put(
        Routes.applicationGuildCommands(bot.id, guilds.main), { body: Interactions });
    } else {
      await rest.put(
        Routes.applicationCommands(bot.id), { body: Interactions });
    };
  })
  
  return console.log(Table.toString());
};

module.exports = { loadInteractions };