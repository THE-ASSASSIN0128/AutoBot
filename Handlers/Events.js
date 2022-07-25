function loadEvents(client) {
  const fs = require("fs");
  const ascii = require("ascii-table");
  const Table = new ascii("event files")
    .setHeading("file", "status");
  
  const folders = fs
    .readdirSync(`${process.cwd()}/Events`)
  
  for (const folder of folders) {
    const files = fs
      .readdirSync(`${process.cwd()}/Events/${folder}`)
      .filter(file => file.endsWith(".js"));
    
    for (const file of files) {
      const event = require(`${process.cwd()}/Events/${folder}/${file}`);
      
      if (!event.name) {
        Table.addRow(file, "missing a name");
      } else {
        Table.addRow(file, "🟢loaded");
      };
      

      try {
        if (event.rest) {
          if (event.once) {
            client.rest.once(event.name, (...args) => event.execute(...args, client));
          } else {
            client.rest.on(event.name, (...args) => event.execute(...args, client));
          };
        } else {
          if (event.once) {
            client.once(event.name, (...args) => event.execute(...args, client));
          } else {
            client.on(event.name, (...args) => event.execute(...args, client));
          };
        };
      } catch (error) {
        console.error(error)
      };
      continue;
    }
  }
  return console.log(Table.toString());
};

module.exports = { loadEvents };