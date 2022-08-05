const {
  EmbedBuilder,
  CommandInteraction,
  Client
} = require("discord.js");




module.exports = {
  name: "set-position",
  description: "Set a roles position by selecting a role and providing a position",
  testOnly: true,
  options: [
    {
      name: "role",
      description: "The role to change position.",
      type: 8,
      required: true    
    },
    {
      name: "position",
      description: "The position for the role.",
      type: 4,
      required: true
    }
  ],
  execute: async(interaction, client) => {
    const guild = interaction.guild;
    const role = interaction.options.getRole("role");
    const position = interaction.options.getInteger("position");
    const HighestRole = guild.roles.highest;
    
    try {
      if (HighestRole.position === role.position) {
        await guild.roles.setPosition(role.id, position);
        const r = await guild.roles.cache.get(role.id);
        interaction.reply({
          content: `Change the role [${role}] position to __${r.position}__.\nHighest Role : ${HighestRole.position}`,
          ephemeral: true
        });
      } else {
        interaction.reply({
          content: `The position you provided is higher or equal to my role position`,
          ephemeral: true
        });
      };
      
      

    } catch (err) {
      interaction.reply({
        content: `**ERROR :** ${err}`,
        ephemeral: true
      });
    };     
  }
}