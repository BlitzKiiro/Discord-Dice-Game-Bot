const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "server",
    description: "get server's info",
    async execute(message,database){
        message.react('👍')
        const server = message.guild
        const info = await database.getServerStats(server.id)
        const msg_embed = new MessageEmbed()
            .setColor('#1abc9c')
            .setAuthor(server.name,server.iconURL())
            .setThumbnail(server.iconURL())
            .setFooter(message.client.user.username,message.client.user.displayAvatarURL())
            .addFields([
                {name : "**Total Players: **" , value:`\` ${info.players} \`` , inline:true},
                {name : "**Total Played Games **" , value:`\`${info.games } \`` , inline:true },
            ])
        message.channel.send('',msg_embed)     
    }
}