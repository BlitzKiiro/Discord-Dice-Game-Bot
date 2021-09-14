const { MessageEmbed , MessageAttachment } = require('discord.js');

module.exports = {
    name: "player",
    description: "get player's info",
    async execute(message,database){
        const mentions = message.mentions.members
        if ( mentions.size >0 && message.mentions.users.first().bot === true ) {
            const meme = new MessageAttachment(`${__root}/attachments/meme replies/dustupid.jpg`)
            await message.reply("Dude You are mentioning a bot!", meme)
            return
        }
        message.react('👍')
        const member = mentions.size > 0  ? mentions.first().user : message.author
        const info = await database.getPlayer(member.id,message.guild.id)
        const luck_ratio = info.played > 0 ? (info.won/info.played).toFixed(2)  : 0
        const msg_embed = new MessageEmbed()
            .setColor('#f1c40f')
            .setAuthor(member.username,member.displayAvatarURL())
            .setThumbnail(member.displayAvatarURL())
            .setFooter(member.tag)
            .addFields([
                {name : "**Balance: **" , value:`\` ${info.credits} \`` , inline:true},
                {name : "**Rank **" , value:`\`${info.rank_name ?? 'un ranked'} \`` , inline:true },
                {name : "**Trophy **" , value:`\` ${info.trophy_name ?? 'No trophies' } \`` , inline:true},
                {name : "**Played Games**" , value:`\` ${info.played} \`` , inline:true},
                {name : "**Won Games **" , value:`\` ${info.won} \`` , inline:true},
                {name : "**Luck Ratio **" , value:`\` ${luck_ratio} \`` , inline:true},
            ])
        message.channel.send('',msg_embed)      

    }
}