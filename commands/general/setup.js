module.exports = {
    name:'setup',
    description : 'Used to setup bot channel once', 
    execute(message) {

        let server = message.guild
        let cate = server.channels.cache.filter( channel => channel.type === 'category' && channel.name === 'Potato Roulette')
        if ( cate.size > 0 ) {
            message.react('❌')
            message.channel.send('Potato Roulette category already exists \n bot is already setuped')
            return
        }

        message.react('✅')
        server.channels.create('Potato Roulette', {
            type : 'category',
        }).then(channel => {
            server.channels.create('Roulette Commands', {
                type : 'text',
                parent: channel,
            }) .then(
                message.channel.send('Ready 👌')
            )
        })

    }
}