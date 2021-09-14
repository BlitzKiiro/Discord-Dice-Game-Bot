

module.exports = {
    name: "buy-rank",
    description: "buy rank by number",
    async execute(message,database,args){
        if (!args  ) {
            await message.reply("please provide a rank number")
            return
        }
        args = parseInt(args[args.length - 1],10) - 1
        const player = message.author;
        if ( !(Number.isInteger(args)) || args < 0) {
            await message.reply("please provide a valid positive number")
            return
        }
        const ranks = await database.getRanks()
        const user_rank = await database.getRank(player.id)
        if (args >= ranks.length) {
            await message.reply("please provide an existing rank number")
            return
        }
        if ( user_rank && ( user_rank.price >= ranks[args].price ) ) {
            await message.reply("Cannot acquire same or a lower rank")
            return
        }
        if ( await database.getBalance(player.id) < ranks[args].price ) {
            await message.reply("insufficient balance")
            return
        }
        message.react('🛒')
        await database.charge(player.id,ranks[args].price)
        await database.acquireRank(player.id,ranks[args])
        await message.channel.send(`🛒 | ${player.username} has acquired the rank of ** ${ranks[args].name} **`)
    }
}