const fs = require('fs')
const fetch = require('node-fetch')
const coordinates = require(__root+'/attachments/meme/coordinates.json')
const jimp = require('jimp')


module.exports = async (losing_player) => {

    //get random meme template img and coordinates
    const memes = fs.readdirSync(`${__root}/attachments/meme`)
    const ran_num = Math.floor(Math.random() *  (memes.length-1) + 1 )
    const meme =  fs.readFileSync(`${__root}/attachments/meme/${ran_num}.jpg`)
    const xyr = coordinates[ran_num]

    //get player avatar img
    const avatar_url = losing_player.displayAvatarURL({ format:'jpg',dynamic:false,size:512})
    const response = await fetch(avatar_url)
    const avatar = await response.buffer()

    // combining images using jimp
    const bg = await jimp.read(meme)
    const fg = await jimp.read(avatar)
    await fg.resize(xyr.r,jimp.AUTO)
    fg.circle()
    bg.blit(fg, xyr.x - 0.5* xyr.r , xyr.y - 0.5* xyr.r )

    return bg.getBufferAsync(jimp.MIME_JPEG)
}