const {
  Client,
  Collection
} = require("discord.js");
const token = process.env["Token"];
const express = require("express");
const app = express();



app.listen(3000, () => {
  console.log("website is ready")
});
app.get("/", (req, res) => {
  res.send("<h>Bot is online.</h>")
});


//Making a client property to use globally.
const client = new Client({
  intents: 33409, 
  allowedMentions: {
    repliedUser: false
  }
});


//Collections to store message/slash commands.
client.commands = new Collection();
client.interactions = new Collection();
client.aliases = new Collection();


//Connect to your bot by using a token (provided by discord)
client.login(token)
  .then(() => {
    console.log(`logged in as ${client.user.tag}`)
  })
  .catch((error) => {
    console.error(error)
  });