const { MessageAttachment } = require("discord.js");
const channelCreator = require("./game functions/channelCreator");
const rollListener = require("./game functions/rollListener");
const rollGif = require("./game functions/rollGif");
const endListener = require("./game functions/endListener");
const getMeme = require("./game functions/getmeme");
const playersEmbed = require("./game functions/player embed");
const startingReact = require("./game functions/startingReact");
const createWinner = require("./game functions/createWinner");

module.exports = {
  name: "play",
  description: "Start a game room",
  async execute(message, database) {
    // create game channel
    await message.react("🎯");
    const playing_channel = await channelCreator(message);
    await message.reply(
      `\nA playing room has been created here ${playing_channel}`
    );

    //wait for players interaction to start or end game
    const react_msg = await playing_channel.send(
      `Click on the react in 30 seconds to joing the game \n minimum : 2 players & maximum : 6 players`
    );
    react_msg.react("👌");
    const collected_reactions = await startingReact(react_msg);
    if (
      collected_reactions === null ||
      collected_reactions.get("👌").count < 3
    ) {
      await playing_channel.send(
        "Insufficent number of players has reacted \n Game will be cancelled"
      );
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await playing_channel.delete();
      return;
    }
    const players = collected_reactions
      .get("👌")
      .users.cache.filter((user) => user.bot !== true);
    //get players mentions & give permissions to players to wrtie in chat and
    players.each(async (player) => {
      await playing_channel.overwritePermissions([
        { id: player, allow: "SEND_MESSAGES" },
      ]);
    });

    await playing_channel.send(`Game started 🎲`);
    //collect and listen to Roll messages utill 1 player is left
    elimination_list = Array.from(players.values());
    while (elimination_list.length > 1) {
      //loop through remaining players list
      await playing_channel.send(
        `**Round ${players.size - elimination_list.length + 1}**`
      );
      const embed = playersEmbed(elimination_list);
      await playing_channel.send({ embed: embed });
      const roll_msg = await playing_channel.send(
        "Type roll in 30 seconds to roll the dice or it will be rolled automatically"
      );

      //wait for the roll msg and rolling the dice
      await rollListener(playing_channel);
      await roll_msg.delete();
      let result = await rollGif(playing_channel, elimination_list.length);
      //eliminating losing player
      let losing_player = elimination_list[result - 1];
      elimination_list = elimination_list.filter(
        (item) => item !== losing_player
      );
      const meme = await getMeme(losing_player);
      const meme_attachment = new MessageAttachment(meme);
      await playing_channel.send(meme_attachment);
      playing_channel.send(`player ${losing_player} is eliminated and muted`);
      playing_channel.updateOverwrite(losing_player, { SEND_MESSAGES: false });

      await new Promise((resolve) => setTimeout(resolve, 3000));
    }

    //end game and delete channel
    const winning_player = elimination_list[0];
    await playing_channel.send(
      `Game has ended 🎯 \nPlayer ${winning_player} 👑 has won`
    );
    const king_img = await createWinner(elimination_list[0]);
    const king_attachment = new MessageAttachment(king_img);
    await playing_channel.send(king_attachment);
    //recording game in database
    const reward = await database.recordGame(
      message.guild.id,
      players,
      winning_player.id
    );
    await playing_channel.send(`Congratulations, you've won ${reward} 💰`);

    await playing_channel.send(
      "Type end in 60 seconds to delete channel or it will be deleted automatically"
    );
    await endListener(playing_channel);
    setTimeout(() => {
      playing_channel.delete();
    }, 1000);
  },
};
