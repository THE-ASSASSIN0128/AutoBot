const {
  Client,
  Collection
} = require("discord.js");
const token = process.env["Token"]
const express = require("express");
const app = express();

//All Functions
const { loadEvents } = require(`${process.cwd()}/Handlers/Events.js`);
const { loadMessages } = require(`${process.cwd()}/Handlers/Messages.js`);
const { loadInteractions } = require(`${process.cwd()}/Handlers/Interactions.js`);



app.listen(3000, () => {
  console.log("website is ready")
});
app.get("/", (req, res) => {
  res.send("<h>Bot is online.</h>")
});


//Making a client property to use globally.
const client = new Client({
  intents: 34815, 
  allowedMentions: {
    repliedUser: false
  }
});


//Collections to store message/slash commands.
client.commands = new Collection();
client.interactions = new Collection();
client.aliases = new Collection();


//Connect to your bot by using a token (provided by discord)
client.login(token).then(() => {
  loadEvents(client);
  loadMessages(client);
  loadInteractions(client);
}).catch((error) => {
  console.error(error)
});