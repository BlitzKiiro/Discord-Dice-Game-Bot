module.exports = async (message) => {
  try {
    const filter = (reaction) => reaction.emoji.name === "👌";
    const collected_reactions = await message.awaitReactions(filter, {
      time: 30000,
      max: 6,
    });
    return collected_reactions;
  } catch (error) {
    console.log(error);
  }
};
