module.exports = async (message,players_count) => {
    try {
        const filter = reaction  => reaction.emoji.name === '👌'
        const collected_reactions = await message.awaitReactions( filter , { time: 60000 , max: players_count+1  })
        return collected_reactions
    } catch (error) {
        console.log(error)
    }
}