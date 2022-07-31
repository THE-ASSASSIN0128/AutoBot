const {
  EmbedBuilder
} = require("discord.js");
const {
  colour,
  image,
  url
} = require(`${process.cwd()}/config.json`);
const {
  version
} = require(`${process.cwd()}/package.json`);

const wait = require("timers/promises").setTimeout;


module.exports = {
  name: "kick",
  description: "kick a specific member/user from a server.",
  testOnly: true,
  usage: "[kick] is command name.\nCommand Usage : \n/kick {member:} {member}. Here member refers to the member/user whom the bot will kickout from the guild/server.",
  options: [
    {
      name: "user",
      description: "The user to delete messages",
      type: 6,
      required: true
    },
    {
      name: "reason",
      description: "Reason for Kicking.",
      type: 3,
      required: false
    }
  ],
  execute: async (interaction, client) => {
    const user = interaction.options.getUser("user");
    const reason = interaction.options.getString("reason");
    let Response = new EmbedBuilder()
      .setColor(colour.bot)
      .setFooter({
        text: `${client.user.username} | V•${version}`
      })
    

    if (!user)
      return interaction.reply({
        embeds: [
          Response.setDescription("Can't kick that member or there isn't any member. Please specify a valid guild member.")
        ]
      });

    try {
      await user.send({
        embeds: [
          Response.setDescription(`**You have been Kick Out**\n\n**Guild/Server :** ${interaction.guild.name}\n**Reason :** ${(reason) || "No Reason Specified."}`)
        ]
      });
      
    } catch (error) {
      interaction.reply({
        embeds: [
          new EmbedBuilder()
          .setTitle("⚠️ ERROR")
          .setColor(colour.error)
          .setDescription(`There was an error while executing the command.\n**ERROR :**\n${error}`)
          .setThumbnail(image.error)
          .setFooter({
            text: `${client.user.username} | V•${version}`,
            iconURL: `${client.user.avatarURL({
              dynamic: true,
              size: 4096
            })}`
          })
          .setTimestamp()
        ]
      })
    };
  }
};