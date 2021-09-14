const {prefix} = require(__root+'/config.json')

module.exports = {
    name: "help",
    description: "Lists bot commands",
    execute(message){
        
        message.react('👍')
        let cmds = '';
        __commands.forEach( command => {
            cmds += `Command: ${prefix}${command.name} - ${command.description} \n`
        });
        message.channel.send(cmds)
    }
}