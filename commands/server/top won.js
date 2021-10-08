const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "top-win",
  description: "Lists players with highest winning rates in this server",
  async execute(message, database) {
    const Client = message.client;
    const bot = message.client.user;
    const Players = await database.getTopServerWinners(message.guild.id);
    let description = "";
    for (let i = 0; i < Players.length; i++) {
      try {
        const player = await Client.users.fetch(Players[i].uid);
        description += `#${i + 1} | ${player}  Won : \`${
          Players[i].won
        } \` Played : \`${Players[i].played}\` \n - \n`;
      } catch (error) {
        console.log(error);
        continue;
      }
    }
    const msg_embed = new MessageEmbed()
      .setColor("#feca57")
      .setAuthor(bot.username + " Top Players", bot.displayAvatarURL())
      .setTitle("🏆 Top Winning Players in this server")
      .setFooter(message.author.tag, message.author.displayAvatarURL())
      .setDescription(description);
    message.channel.send("", msg_embed);
  },
};
