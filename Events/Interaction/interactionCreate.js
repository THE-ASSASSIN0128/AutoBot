const {
  cwd
} = require("process");
const {
  EmbedBuilder
} = require("discord.js");
const {
  image,
  colour
} = require(`${cwd()}/config.json`);
const {
  version
} = require(`${cwd()}/package.json`);



module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {

    //Checking interaction type.
    if (interaction.isChatInputCommand()) {
      
      try {
        //Getting the command
        const command = client.interactions.get(interaction.commandName);
        //Returning a message if the command isn't valid
        if (!command) {
          interaction.reply({
            embeds: [
              new EmbedBuilder()
              .setTitle("ERROR")
              .setDescription(`**Sorry**, This [${interaction.commandName}] command doesn't exist. Try using /help to get help with commands.`)
              .setColor(colour.error)
              .setThumbnail(client.user.avatarURL({
                dynamic: true, size: 4096
              }))
              .setFooter({
                text: client.user.username,
                icomURL: client.user.avatarURL({
                  dynamic: true, size: 4096
                })
              })
              .setTimestamp()
            ]
          }) && client.interactions.delete(interaction.command);
            return;
        };
        
        //Checking the command Permissions
        if (command.permissions) {
          
          //Checking User permissions
          if (!interaction.member.permissions.has(command.permisssions)) {
            
            interaction.reply({
              embeds: [
                new EmbedBuilder()
                .setAuthor({
                  name: `ERROR`,
                  iconURL: `${image.error}`
                })
                .setDescription(`The command you used **[${cmd}]** is required some permission(s).\n**PERMISSION (S) :**\n${command.permissions.join("\n")}.\nYou need this permission(s) in order to use this command.`)
                .setColor(colour.error)
                .setThumbnail(`${client.user.avatarURL({
                  dynamic: true, size: 4096
                })}`)
                .setFooter({
                  text: `${client.user.username} | V•${version}`,
                  iconURL: `${client.user.avatarURL({
                    dynamic: true, size: 4096})}`
                })
                .setTimestamp()
              ]
            });
          }

          //Checking Bot's permissions
          if (!interaction.guild.me.permissions.has(command.permissions)) {
            interaction.reply({
              embeds: [
                new EmbedBuilder()
                .setAuthor({
                  name: `ERROR`,
                  iconURL: `${image.error}`
                })
                .setDescription(`The command you used **[${cmd}]** is required some permission(s).\n**PERMISSION (S) :**\n${command.permissions.join("\n")}.\nI need this permission(s) in order to run/execute the command.`)
                .setColor(colour.error)
                .setThumbnail(`${client.user.avatarURL({
                  dynamic: true, size: 4096
                })}`)
                .setFooter({
                  text: `${client.user.username} | V•${version}`,
                  iconURL: `${client.user.avatarURL({
                    dynamic: true, size: 4096})}`
                })
                .setTimestamp()
              ]
            });
          };

        };

        //Checking command cooldowns
        /*if (command.cooldown && onCoolDown2(interaction, command)) {
          return interaction.reply({
            embeds: [
              new MessageEmbed()
              .setTitle("⏱️ : ON COOL DOWN")
              .setDescription(`The command **[${command.name}]** you are trying to use is on cooldown **[${command.cooldown}s]**. You can use the command after **[${onCoolDown2(interaction, command).toFixed(1)}]**`)
              .setColor(colour.cooldown)
              .setFooter({
                text: `${client.user.username} | V•${version}`,
                iconURL: `${client.user.avatarURL({
                  dynamic: true,
                  size: 4096
                })}`
              }).setTimestamp()
            ]
          })
        };*/
      
        command.execute(interaction, client);
        
      } catch (error) {
        
        interaction.reply({
          embeds: [
            new EmbedBuilder()
            .setAuthor({
              name: "ERROR",
              iconURL: `${image.error}`
            })
            .setColor(colour.error)
            .setDescription(`There was an error while executing the command.\n**ERROR :**\n${error}`)
          ]
        });
        console.error(error);
        
      };
    };
  },
};