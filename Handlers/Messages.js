

module.exports = async(client, PG, ascii) => {
  const Table = new ascii("message commands");
  Table.setHeading("files", "status");
  (await PG(`${process.cwd()}/Commands/Message/*/*.js`)).map(
    async(file) => {
      const command = require(file);
      const M = file.split("/");
      
      if (!command.name)
        return Table.addRow(M[7], "• missing a name");

      client.commands.set(command.name, command);

     if (command.aliases)
       command.aliases.forEach(
         async(alias) => {
           client.aliases.set(alias, command.name)
         })
      Table.addRow(M[7], "✓");
    });
  console.log(Table.toString());
};

function loadMessages(client) {
  const fs = require("fs");
  const ascii = require("ascii-table");
  const Table = new ascii("message commands")
    .setHeading("file", "status");
  
  const folders = fs
    .readdirSync(`${process.cwd()}/Messages`)
  
  for (const folder of folders) {
    const files = fs
      .readdirSync(`${process.cwd()}/Messages/${folder}`)
      .filter(file => file.endsWith(".js"));
    
    for (const file of files) {
      const command = require(`${process.cwd()}/Messages/${folder}/${file}`);
      
      if (!command.name) {
        Table.addRow(file, "missing a name");
      };
      if (!command.description) {
        Table.addRow(file, "missing a description");
      };

      Table.addRow(file, "🟢loaded");
      try {
        client.commands.set(command.name, command);
        if (command.aliases)
          command.aliases.forEach(async(alias) => {
            client.aliases.set(alias, command.name)
          });
      } catch (error) {
        console.error(error)
      };
      continue;
    }
  }
  return console.log(Table.toString());
};

module.exports = { loadMessages };