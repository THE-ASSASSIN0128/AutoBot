const {
  EmbedBuilder
} = require("discord.js");


module.exports = {
  name: "clear",
  description: "Delete a certain amount of message in a channel.",
  usage: "[clear] is command name.\nCommand Usage : \n/clear {amount:} {amount} | [user]: {user} []: []:",
  options: [
    {
      name: "amount",
      description: "Amount of messages to delete.",
      type: "INTEGER",
      required: true
    },
    {
      name: "user",
      description: "The user to delete messages",
      type: "USER",
      required: true
    },
    {},
    {},
    {}
  ],
  execute: async (interaction, client) => {
    const amount = interaction.options.getInteger(amount);
    const user = interaction.options.getUser(user);

    if (!amount) return interaction.reply({
      content: "Please enter a valid number between 1-100"
    });

    
  }
};