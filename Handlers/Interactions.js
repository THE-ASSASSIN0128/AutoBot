const {
  bot,
  image,
  guilds
} = require(`${process.cwd()}/config.json`);



function loadInteractions(client) {
  const fs = require("fs");
  const ascii = require("ascii-table");
  const Table = new ascii("slash commands")
    .setHeading("file", "status");

  const folders = fs
    .readdirSync(`${process.cwd()}/Interactions`)
  
  for (const folder of folders) {
    const files = fs
      .readdirSync(`${process.cwd()}/Interactions/${folder}`)
      .filter(file => file.endsWith(".js"));
    
    for (const file of files) {
      const ArrayofInteractions = [];
      const command = require(`${process.cwd()}/Interactions/${folder}/${file}`);
      
      if (!command.name) {
        Table.addRow(file, "missing a name");
      };
      if (!command.description) {
        Table.addRow(file, "missing a description");
      };

      Table.addRow(file, "🟢loaded");
      
      client.interactions.set(command.name, command);
      ArrayofInteractions.push(command);
      try {
        const guild = client.guilds.cache.get(guilds.main);
        guild.commands.set( ArrayofInteractions);
      } catch (error) {
        console.error(error)
      };
      continue;
    }
  }
  return console.log(Table.toString());
};

module.exports = { loadInteractions };