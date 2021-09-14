const { MessageEmbed } = require('discord.js');

module.exports = (players) => {
    const playersEmbed = new MessageEmbed().setTitle('Players:')
    for ( let i = 0 ; i < players.length ; i++ ) {
       playersEmbed.addField(`Number ${i+1}`,players[i].username,true)
    }

    return playersEmbed
}