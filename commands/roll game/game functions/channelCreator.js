module.exports = async (message) => {
  const server = message.guild;
  return await server.channels.create(
    `${message.author.username.toString()} game`,
    {
      type: "text",
      parent: server.channels.cache
        .filter((channel) => channel.name === "Potato Roulette")
        .array()[0],
      permissionOverwrites: [
        {
          id: server.roles.everyone,
          deny: ["SEND_MESSAGES"],
        },
      ],
    }
  );
};
