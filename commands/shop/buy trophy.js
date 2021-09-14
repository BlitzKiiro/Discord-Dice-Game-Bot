

module.exports = {
    name: "buy-trophy",
    description: "buy trophy by number",
    async execute(message,database,args){
        if (!args  ) {
            await message.reply("please provide a trophy number")
            return
        }
        args = parseInt(args[args.length - 1],10) - 1
        const player = message.author;
        if ( !(Number.isInteger(args)) || args < 0) {
            await message.reply("please provide a valid positive number")
            return
        }
        const trophies = await database.getTrophies()
        const user_trophy = await database.getTrophy(player.id)
        if (args >= trophies.length) {
            await message.reply("please provide an existing trophy number")
            return
        }
        if ( user_trophy && ( user_trophy.price >= trophies[args].price ) ) {
            await message.reply("Cannot acquire same or a lower trophy")
            return
        }
        if ( await database.getBalance(player.id) < trophies[args].price ) {
            await message.reply("insufficient balance")
            return
        }
        message.react('🛒')
        await database.charge(player.id,trophies[args].price)
        await database.acquireTrophy(player.id,trophies[args])
        await message.channel.send(`🛒 | ${player.username} has acquired the trophy ** ${trophies[args].name} **`)
    }
}