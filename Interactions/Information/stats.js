const {
  cwd
} = require("process");
const {
  EmbedBuilder,
  MessageActionRow,
  MessageSelectMenu,
  MessageButton,
  version
} = require("discord.js");
const {
  connection
} = require("mongoose");
const {
  colour,
  url,
  owner
} = require(`${cwd()}/config.json`);
const {
  mongoose
} = require("mongoose");
const pkg = require(`${cwd()}/package.json`);
const moment = require("moment");
require(`${cwd()}/Events/Client/ready.js`);




module.exports = {
  name: "stats",
  category: "Information",
  description: "Replies with the bots currnet status.",
  execute: async(interaction, client) => {
    let uptime = Math.floor (client.uptime / 1000)
    let days = Math.floor(uptime / 86400)
    let hours = Math.floor(uptime / 3600) % 24
    let minutes = Math.floor(uptime / 60) % 60
    let seconds = Math.floor(uptime) % 60 
    let webLatency = new Date() - interaction.createdAt   
    let apiLatency = client.ws.ping
    let totalLatency = webLatency + apiLatency
    let emLatency = {
      Green: '🟢',
      Yellow: '🟡',
      Red: '🔴'
    };
    let king = interaction.guild.members.cache.get(owner.id)

/*
           .addField(`📡 Websocket Latency`, `\`${webLatency <= 200 ? emLatency.Green : webLatency <= 400 ? emLatency.Yellow : emLatency.Red}\` \`${webLatency}\`ms`)
           .addField(`🛰 API Latency`, `\`${apiLatency <= 200 ? emLatency.Green : apiLatency <= 400 ? emLatency.Yellow : emLatency.Red}\` \`${apiLatency}\`ms`)
           .addField(`⏲ Uptime`, `\`${days}Days\` : \`${hours}Hrs\` : \`${minutes}Mins\` : \`${seconds}Secs\``)
           .setFooter({
             text: `${client.user.username} • v${version}*/
    
    let Status = new EmbedBuilder()
      .setTitle("GENERAL INFO")
      .setDescription(`**🪧 Name :** ${client.user.username} | ${client.user}\n**🏷️ Tag :** ${client.user.tag}\n\**⚙️ Version :** ${pkg.version}\n**👑 Owner :** ${king.user.tag} | ${king}\n**🌐 Website :** Coming soon.\n\n**\`\`\`\nStay tuned for more updates.\n\`\`\`**`)
      .setColor(colour.bot)
      .setThumbnail(`${client.user.avatarURL({
        dynamic: true,
        size: 4096
      })}`)
      .addFields(
        {
          name: "BOT'S INFO",
          value:`**❕ Status** :  [\`🟢\`] Online\n**🏓 Ping** : ${client.ws.ping}ms\n**⏱️ Uptime** :\n\`\`\`\n${days}Days, ${hours}Hours, ${minutes}Minutes, ${seconds}Seconds\n\`\`\``
        },
        {
          name: "DataBase INFO",
          value: `**🪧 Name :** MongoDB\n**❕ Status :** ${switchTo(connection.readyState)}`
        },
        {
          name: "HOST & LIBRARY INFO",
          value: `**🪧 Name :** [repl.it](https://repl.it)\n📚 **Library :** discord.js | V•${version}`
        },
        {
          name: "**GitHub Repository**",
          value: `**🪧 Name :** ${pkg.name}\n**🔗 Link :** [THE-ASSASSIN0128/${pkg.name}](${pkg.homepage})`
        })


    /*const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('select')
					.setPlaceholder('Nothing selected')
					.addOptions([
						{
							label: 'Select me',
							description: 'This is a description',
							value: 'first_option',
						},
						{
							label: 'You can select me too',
							description: 'This is also a description',
							value: 'second_option',
						},
					]),
			);*/
    
    await interaction.reply({
      embeds: [Status]
    });
  }
};



function switchTo(val) {
  var status = " ";
  switch(val) {
    case 0: status = `[\`🔴\`] Disconnected`
    break;
    case 1: status = `[\`🟢\`] Connected`
    break;
    case 2: status = `[\`🟡\`] Connecting`
    break;
    case 3: status = `[\`🟣\`] Disconnecting`
    break;
  };
  return status;
}