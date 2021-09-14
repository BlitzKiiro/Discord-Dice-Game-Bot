

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		//setting bot status
		client.user.setPresence({ activity: { name: 'Shooting people with potatoes' , type:'PLAYING' }, status: 'online' })
		//initializing db

		console.log('bot is online!');

	},
};