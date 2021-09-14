const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "trophies",
    description: "open trophies shop",
    async execute(message,database){
        message.react('🛒')
        const bot = message.client.user
        const data = await database.getTrophies()
        let description = ""
        for ( let i = 0 ; i < data.length ; i++ ) {
            description += `#${i+1} | ${data[i].name} Price : \`${data[i].price}\`\n - \n`
        }
        const msg_embed = new MessageEmbed()
            .setColor('#9b59b6')
            .setAuthor(bot.username+' trophies store',bot.displayAvatarURL())
            .setTitle('🛒 Trophies Shop, Choose what you like')
            .setFooter(message.author.tag,message.author.displayAvatarURL())
            .setDescription(description)
        message.channel.send('',msg_embed)   
    }
}