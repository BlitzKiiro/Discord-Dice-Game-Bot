const fs = require('fs')
const fetch = require('node-fetch')
const coordinates = require(__root+'/attachments/winner/coordinates.json')
const jimp = require('jimp')

module.exports = async(winning_player) => {
    //get throne and crown img
    const throne = fs.readFileSync(`${__root}\\attachments\\winner\\throne.jpg`)
    const crown = fs.readFileSync(`${__root}\\attachments\\winner\\crown.png`)
    //get player avatar img
    const avatar_url = winning_player.displayAvatarURL({ format:'jpg',dynamic:false,size:512})
    const response = await fetch(avatar_url)
    const avatar = await response.buffer()
    // reading images using jimp
    const bg = await jimp.read(throne)
    const cr = await jimp.read(crown)
    const fg = await jimp.read(avatar)
    //resizing images using jimp
    await cr.resize(coordinates.avatar.r,jimp.AUTO )
    await fg.resize(coordinates.crown.r,jimp.AUTO )
    fg.circle()
    // combining images using jimp
    bg.blit(fg, coordinates.avatar.x, coordinates.avatar.y)
    bg.blit(cr, coordinates.crown.x, coordinates.crown.y)



    return bg.getBufferAsync(jimp.MIME_JPEG)
    
}