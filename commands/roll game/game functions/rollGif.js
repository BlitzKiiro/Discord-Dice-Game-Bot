const {MessageAttachment} = require('discord.js')

module.exports = async ( playing_channel, args) => {

    const result = Math.floor(Math.random() *  args + 1 )
    const rolling_img = new MessageAttachment(`${__root}/attachments/dice/roll_lite.gif`)

    let txt_msg = await playing_channel.send('rolling...')
    let img_msg = await playing_channel.send(rolling_img)
    await txt_msg.edit('wait for the dice to stop...')
    const winner_img = new MessageAttachment(`${__root}/attachments/dice/0${result}.jpg`)

    const rolling_promise = async ()=> {
        return new Promise( (resolve,reject) => { 
            setTimeout( 
                async ()=> {
                    await img_msg.delete()
                    const winner_img_msg = await playing_channel.send(winner_img)
                    await txt_msg.edit(`Number ${result} is to be eliminated`)
    
                    setTimeout( async () => {
                       await txt_msg.delete()
                       await winner_img_msg.delete()
                       resolve(true)
                    }, 1000);
                }
            ,4000)
        })
    }

    await rolling_promise();
    return result
       
}
