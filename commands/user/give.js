const {prefix} = require(__root+'/config.json')
const {MessageAttachment} = require('discord.js')

module.exports = {
    name: "give",
    description: "transfer credits to another user",
    async execute(message,database,args){
        args = parseInt(args[args.length - 1],10)
        if (!(message.mentions.members.size > 0) || args === null ) {
            await message.reply(`Please provive a mention and a number at this form\n ${prefix} ${this.name} @mention amount `)
            return
        }
        if ( message.mentions.users.first().bot === true ) {
            const meme = new MessageAttachment(`${__root}/attachments/meme replies/stupid fellas.jpg`)
            await message.reply("You cannot give money to a bot!\n What's the matter with you?", meme)
            return
        }
        if ( message.mentions.users.first() === message.author ) {
            const meme = new MessageAttachment(`${__root}/attachments/meme replies/confused.jpg`)
            await message.reply("Dude! \n You are literally trying to give money to yourself", meme)
            return
         }
        if ( !(Number.isInteger(args)) || args <= 0) {
            await message.reply("please provide a valid positive number")
            return
        }
        if ( await database.getBalance(message.author.id) < args ) {
            await message.reply("insufficient balance")
            return
        }
        message.react('💰')
        const giver = message.author
        const reciever = message.mentions.members.first().user
        await database.charge(giver.id, args)
        await database.transfer(reciever.id,args)
        const meme = new MessageAttachment(`${__root}/attachments/meme replies/money.jpg`)
        const reply = `**💸 | ${giver.username}, has transferred \`${args}\` 💵 to ${reciever}**`
        message.channel.send(reply,meme)

    }
}