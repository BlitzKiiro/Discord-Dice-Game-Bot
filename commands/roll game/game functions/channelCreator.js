module.exports =  async (message,players) => {
    const server = message.guild
    return await server.channels.create( `${message.author.username.toString()} game` , {
        type : 'text',
        parent: server.channels.cache.filter(channel => channel.name === 'Potato Roulette').array()[0],
        permissionOverwrites : [
            {
                id: server.roles.everyone,
                deny : [
                    'VIEW_CHANNEL',
                    'SEND_MESSAGES',
                ]
            },
            {
                id: message.author.id,
                allow : [
                    'VIEW_CHANNEL',
                    'SEND_MESSAGES',
                ]
            }
        ]
    } ).then(
        playing_channel => {
            players.forEach( player => {
                playing_channel.updateOverwrite( player ,
                    { 
                        VIEW_CHANNEL: true,
                        SEND_MESSAGES : true,
                });
            }) 
            return playing_channel
        }
    )
}
