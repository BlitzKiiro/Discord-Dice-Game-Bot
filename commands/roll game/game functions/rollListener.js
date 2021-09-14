
module.exports = async (playing_channel) =>  {     
    //roll message collector 
    const roll_filter = m => m.content.toLowerCase() === 'roll'
    try {
        const roll_collected = await playing_channel.awaitMessages( roll_filter, { max: 1, time: 30000, errors: ['time'] })
        roll_collected.first().react('🎲')
    } catch (err) {
        console.log(err)
    }
 
}