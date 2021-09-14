const {MessageAttachment} = require('discord.js')
const channelCreator = require('./game functions/channelCreator')
const rollListener = require('./game functions/rollListener')
const rollGif = require('./game functions/rollGif')
const endListener = require('./game functions/endListener')
const getMeme = require('./game functions/getmeme')
const playersEmbed = require('./game functions/player embed')
const getPlayers = require('./game functions/get players')
const startingReact = require('./game functions/startingReact')
const createWinner = require('./game functions/createWinner')

module.exports = {
    name:'play',
    description:'Start a game with friends that you mention',
    async execute(message,database )  { 

        //get players list,filter it from bots and check length 
        let players = await getPlayers(message)
        if (players === null ) return      

        // create game channel and set permisions
        const playing_channel = await channelCreator(message,players)
        //wait for players interaction to start or end game 
        let mentions =''
        players.forEach(player => { mentions+= player.toString() + ' ' })
        const react_msg = await playing_channel.send(`${mentions} \n All players click on the react in 60 seconds to start game`)
        react_msg.react('👌')
        const collected_reactions = await startingReact(react_msg,players.size)
        if ( collected_reactions === null || collected_reactions.get('👌').count < players.size+1 ) {
            await playing_channel.send('Insufficent number of players has reacted \n Game will be cancelled')
            await new Promise(resolve => setTimeout(resolve,2000))
            await playing_channel.delete()
            return 

        }
        await playing_channel.send('Game started 🎲')
        //collect and listen to Roll messages utill 1 player is left
        elimination_list = Array.from(players.values())
        while ( elimination_list.length > 1 ) {
            
            //loop through remaining players list
            const round_msg = await playing_channel.send(`**Round ${players.size-elimination_list.length+1}**`)
            const embed = playersEmbed(elimination_list)
            const players_msg = await playing_channel.send({ embed : embed })    
            const roll_msg = await playing_channel.send('Type roll in 30 seconds to roll the dice or it will be rolled automatically')

            //wait for the roll msg and rolling the dice
            await rollListener(playing_channel)
            await round_msg.delete()
            await players_msg.delete()
            await roll_msg.delete()
            let result = await rollGif(playing_channel,elimination_list.length)
            //eliminating losing player
            let losing_player = elimination_list[result-1]
            elimination_list = elimination_list.filter(item => item !== losing_player )
            const meme =  await getMeme(losing_player)
            const meme_attachment = new MessageAttachment(meme)
            await playing_channel.send(meme_attachment)
            playing_channel.send(`player ${losing_player} is eliminated and muted`)
            playing_channel.updateOverwrite(losing_player, {  SEND_MESSAGES: false })

            await new Promise(resolve => setTimeout(resolve,3000))

        }

        //end game and delete channel
        const winning_player = elimination_list[0]
        await playing_channel.send(`Game has ended 🎯 \nPlayer ${winning_player} 👑 has won`)
        const king_img = await createWinner(elimination_list[0])
        const king_attachment = new MessageAttachment(king_img)
        await playing_channel.send(king_attachment)
        //recording game in database
        const reward = await database.recordGame(message.guild.id,players,winning_player.id)
        await playing_channel.send(`Congratulations, you've won ${reward} 💰`)

        await playing_channel.send('Type end in 60 seconds to delete channel or it will be deleted automatically')
        await endListener(playing_channel)
        setTimeout( ()=>{ playing_channel.delete()},1000)         
    }
}