const fs = require('fs');
const {token} = require('./config.json')
const Discord = require('discord.js');
const Database = require('./prisma/interface')

//setuping up discord js variables
const client = new Discord.Client();
client.commands = new Discord.Collection();

//global  variables
global.__root = __dirname;
global.__commands = null

//reading commands folder
const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
	__commands = client.commands;

}

//intialize Database 
const database = new Database()

//reading events folder
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args,client));
	} else {
		client.on(event.name, (...args) => event.execute(...args,client,database));
	}
}



client.login(token);