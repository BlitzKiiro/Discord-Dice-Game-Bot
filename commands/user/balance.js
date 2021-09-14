const { MessageAttachment } = require('discord.js');

module.exports = {
    name: "balance",
    description: "get user balance",
    async execute(message,database){
        const mentions = message.mentions.members
        if ( mentions.size >0 && message.mentions.users.first().bot === true ) {
            const meme = new MessageAttachment(`${__root}/attachments/meme replies/visible.jpg`)
            await message.reply("You really trying to know the balance of a bot?", meme)
            return
        }
        message.react('💰')
        const member = mentions.size > 0  ? mentions.first().user : message.author
        const balance = await database.getBalance(member.id)
        let target = ''

        if ( balance <= 20000 ) target = 'poor'
        else if  ( balance > 20000 && balance < 50000 ) target = 'beggar'
        else if ( balance > 100000 && balance < 500000 ) target = 'bb money'
        else if ( balance >= 500000 ) target = 'spong rich'

        const reply = `**💳 | ${member.username}'s ­ balance is \`${balance}\` 💰 **`
        const meme = new MessageAttachment(`${__root}/attachments/meme replies/${target}.jpg`)
        if ( target ) message.channel.send(reply,meme)
        else message.channel.send(reply)
    }
}