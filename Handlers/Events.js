function loadEvents(client) {
  const { readdirSync } = require("fs");
  const ascii = require("ascii-table");
  const Table = new ascii("event files").setHeading("file", "status");
  const eventFolders = readdirSync(`${process.cwd()}/Handlers`).filter(file => file.endsWith(".js"));
  for (eventFiles of eventFolders) {
    for (file of eventFiles) {
      const event = require(file);
      if (!event.name) return Table.addRow(file, "missing a name");
      
    }
  }
}