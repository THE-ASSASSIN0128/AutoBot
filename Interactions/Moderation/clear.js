const {
  EmbedBuilder
} = require("discord.js");
const {
  colour,
  image,
  url
} = require(`${process.cwd()}/config.json`);
const wait = require("timers/promises").setTimeout;


module.exports = {
  name: "clear",
  description: "Delete a certain amount of message in a channel.",
  testOnly: true,
  usage: "[clear] is command name.\nCommand Usage : \n/clear {amount:} {amount} | [user]: {user} []: []:",
  options: [
    {
      name: "amount",
      description: "Amount of messages to delete.",
      type: 4,
      required: true
    }
  ],
  execute: async (interaction, client) => {
    const amount = interaction.options.getInteger("amount");
    const user = interaction.options.getUser("user");
    let Response = new EmbedBuilder().setColor(colour.bot);
    

    if ( amount === 0 || amount > 100 || !amount) {
      interaction.reply({
        content: "Please enter a valid number between 1-100"
      });
      await wait(5000),
      interaction.deleteReply();
      return;
    };
    

    if (user) {
      try {
        const Messages = await interaction.channel.messages.fetch();
        const i = 0;
        const userMessages = await Messages.filter((m) => m.author.id === user.id) && i++;
        const msg = await interaction.channel.bulkDelete(userMessages, true);
        
        Response.setDescription(`Deleted **__${msg.size}__** Messages of **${user.tag}**.`);
        
        interaction.reply({
          embeds: [Response]
        });
        await wait (5000); 
        interaction.deleteReply();
      } catch (error) {
        Response.setDescription(`**Error :**\n${error}.`);
      };
    } else {
      const msg = await interaction.channel.bulkDelete(amount, true);

      if (msg.size === 0) {
        Response.setDescription(`**Unable to Delete any Message(s). The Messages Might be older than 14 days.**`);
      } else {
        Response.setDescription(`Deleted **__${msg.size}__** Messages.`);
      };

      interaction.reply({
        embeds: [Response]
      });
      await wait (5000); 
      interaction.deleteReply();
      
    };
  }
};