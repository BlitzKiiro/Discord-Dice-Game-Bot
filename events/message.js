const {prefix} = require('../config.json')

module.exports = {
	name: 'message',
	execute(message,client,database) {
        if (!message.content.startsWith(prefix) || message.author.bot) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();

        if (!client.commands.has(command)) return;

        let server = message.guild
        if ( command !== 'setup') {
            let parent = server.channels.cache.filter(channel => channel.name === 'Potato Roulette')
            if ( parent.size === 0 ) {
                message.reply(`You need to use the ${prefix}setup command first before you can use the bot`)
                return
            }
        
            // parent = parent.array()[0]
            // if ( message.channel.parentID !== parent.id ) {
            //     message.reply('Bot commands can be only executed in Potato Roulette channels only')
            //     return
            // }
         }

        try {
            client.commands.get(command).execute(message,database,args);
        } catch (error) {
            console.error(error);
            message.reply('there was an error trying to execute that command!');
        }
	},
};