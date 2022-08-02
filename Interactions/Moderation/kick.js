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
      required: false
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
    const guild = interaction.guild;
    const reason = interaction.options.getString("reason") || "No reason is provided.";
    let Response = new EmbedBuilder()
      .setColor(colour.bot)
      .setFooter({
        text: `${client.user.username} | V•${version}`,
        iconURL: `${client.user.avatarURL({
          dynamic: true,
          size: 4096
        })}`
      })
      .setTimestamp()
    

    if (!user)
      return interaction.reply({
        embeds: [
          Response.setDescription("Please specify a valid guild member.")
        ]
      });



    const User = await guild.members.cache.get(user.id);
    const UserRole = User.roles.highest;
    const Bot = await guild.members.cache.get(client.user.id);
    const BotRole = Bot.roles.highest;

    
    try {

      //Checking if the user is a bot or Not
      if (user.bot) {

        //Checking If the user is kickable or Not
        if (User.kickable) {

          //Checking the users roles position
          if (BotRole.position <= UserRole.position)
            return interaction.reply({
              content: "That Bot's Role *[Position]* is higher than mine",
              ephemeral: true
            });

          Response.setDescription(`Successfully kicked **${user.tag}**`);
          User.kick(reason);
          interaction.reply({
            embeds: [Response]
          });

          await wait(10000);
          interaction.deleteReply();
          
        
        } else {
          interaction.reply({
            content: "Can't Kick That Bot",
            ephemeral: true
          });
        };

        
      } else {

        //Checking If the user is kickable or Not
        if (User.kickable) {

          //Checking the users roles position
          if (BotRole.position <= UserRole.position)
            return interaction.reply({
              content: "That Member's **Role [Position]** is higher than mine",
              ephemeral: true
            });

          await user.send({
            embeds: [
              Response.setDescription(`**You Have Been Kicked Out**\n\n**Server :** ${guild.name}\n**Reason :** ${reason}`)
            ]
          });
          Response.setDescription(`Successfully kicked **${user.tag}**`);
          User.kick(reason);
          interaction.reply({
            embeds: [Response]
          });

          await wait(10000);
          interaction.deleteReply();
          
        } else {
          interaction.reply({
            content: "Can't Kick That Member/User",
            ephemeral: true
          });
        }; 
      };
      
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
      });
    };
  }
};