module.exports = async (message) => {

    let players = message.mentions.users.filter((user) => user.bot === false && message.author.id  !== user.id )
        
    if ( players.size < 2 || players.size > 6 ) {
        await message.react('❌')
        await message.channel.send('You need to mention from 2 to 5 players to start')
        return null
    }
    await message.react('🎯')
    players.set(message.author.id,message.author)

    return players

}