const {
  SlashCommandBuilder,
  PermissionFlagsBits
} = require("discord.js");
const { loadEvents } = require(`${process.cwd()}/Handlers/Events.js`);
const { loadMessages } = require(`${process.cwd()}/Handlers/Messages.js`);
const { loadInteractions } = require(`${process.cwd()}/Handlers/Interactions.js`);



module.exports = {
  name: "reload",
  description: "Reload Events/Commands",
  options: [
    {
      name: "events",
      description: "reload the events",
      type: 1
    },
    {
      name: "interactions",
      description: "reload the slash commands",
      type: 1
    },
    {
      name: "messages",
      description: "reload the message commands",
      type: 1
    }
  ],
  execute: async (interaction, client) => {
    const sub = interaction.options.getSubcommand();
    switch(sub) {
      case "events" : {
        loadEvents(client);
        interaction.reply({
          content: "Reloaded Event Files",
          ephemeral: true
        });
      }
      break;
      case "interactions" : {
        loadInteractions(client);
        interaction.reply({
          content: "Reloaded Slash Command Files",
          ephemeral: true
        });
      }
      break;
      case "messages" : {
        loadMessages(client);
        interaction.reply({
          content: "Reloaded Message Command Files",
          ephemeral: true
        });
      }
      break;
    }
  }
}