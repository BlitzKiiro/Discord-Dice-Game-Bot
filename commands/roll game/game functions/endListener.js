
module.exports = async (playing_channel) => {     
    //roll message collector 
    const end_filter = m => m.content.toLowerCase() === 'end'
    try {
        const roll_collected = await playing_channel.awaitMessages( end_filter, { max: 1, time: 60000, errors: ['time'] })
        roll_collected.first().react('💀')
    } catch (err) {
        console.log(err)
    }

}
