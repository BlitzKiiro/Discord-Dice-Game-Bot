const { PrismaClient } = require('@prisma/client')


module.exports = class Database {

    constructor () {
        this.prisma = new PrismaClient()
    }

    recordGame = async (sid,players,wid) => {
        //destructuring models from prisma
        const {player:PlayerModel,games_Record:RecordModel} = this.prisma
        //loop through player list 
        const PIDs = players.map( i => i.id )
        
        for ( let i = 0 ; i < PIDs.length ; i++ ) {
            const id = PIDs[i]
            try {
                //check if this player id exists & creates one if not
               const pquery = await PlayerModel.findUnique({where : {uid : id }})
               if (!pquery) {
                   await PlayerModel.create({ data : {uid : id}})
               }
               //update or create player record
               await RecordModel.upsert({
                   where : {
                       uid_sid : {
                           uid : id,
                           sid : sid
                       }
                   },
                   create : {
                       sid : sid,
                       uid : id,
                       played : 1
                   },
                   update : {
                       played: { increment : 1}
                   }
               })
               
           } catch (error) {
               console.log(error)
           }
        }
        //reward winner and update won games record
        const reward = Math.floor(Math.random() *  4000 + 1000 )
        try {
            await PlayerModel.update({
                where : { uid : wid },
                data : { credits : { increment : reward }}
            })
            await RecordModel.update({
                where : { uid_sid :  {uid : wid , sid : sid }},
                data : {won : {increment : 1}}
            })
        } catch (error) {
            console.log(error)
        }
        return reward
    }

    getBalance = async ( uid ) => {
        try { 
            const user = await this.prisma.player.findUnique({
                where : {uid}}) ?? await this.prisma.player.create({data :{uid}})
            return user.credits
        } catch { 
            console.log(error)
        }
    }
    charge = async (uid , amount ) => {
        try {
            await this.prisma.player.update({
                where : {uid},
                data : { 
                    credits : { decrement : amount }
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
    transfer = async (uid, amount) =>{
        try {
            await this.prisma.player.upsert({
                where : { uid},
                update : { credits : { increment : amount}},
                create: {uid,credits:amount}
            })
        } catch (error) {
            console.log(error)
        }
    }

    getPlayer = async ( uid , sid ) => {
        try {

            const player = await this.prisma.player.findUnique({
                where : {uid},
                select : { 
                    credits : true,
                    trophy_name : true,
                    rank_name : true,
                }
            }) ?? await this.prisma.player.create({data:{ uid}})
            const record = await this.prisma.games_Record.findUnique({
                where : {
                    uid_sid : { uid , sid },
                },
                select : {
                    played : true,
                    won : true
                }
            }) ?? await this.prisma.games_Record.create({data : { uid , sid }})
            return { ...player   , ...record }
        } catch (error) {
            console.log(error)
        }
    }

    getServerStats = async (sid) => {
        try {
            const {_sum} = await this.prisma.games_Record.aggregate({
                _sum : {
                    played : true
                },
                where : {
                    sid 
                }
            }) 
            const games = _sum.played ?? 0 
            const players = await this.prisma.games_Record.count({
                where : {
                    sid,
                    played : {
                        gt : 0
                    }
                }
            }) ?? 0
            return { games , players }
        } catch (error) {
            console.log(error)
        }
    }
    getRank = async (uid) => {
        const player = await this.prisma.player.findUnique({where:{uid}, include:{rank:true}}) 
        return player.rank
    }
    getRanks = async () => {
        const ranks = await this.prisma.rank.findMany({
            orderBy : {
                price : 'desc'
            }
        })
        return ranks
    }
    acquireRank = async (uid,rank) => {
        await this.prisma.player.update({
            where : {uid},
            data : { 
                rank_name : rank.name
            }
        })

    }
    getTrophy = async (uid) => {
        const player = await this.prisma.player.findUnique({where:{uid}, include:{tropy:true}}) 
        return player.tropy
    }
    getTrophies = async () => {
        const trophies = await this.prisma.trophy.findMany({
            orderBy : {
                price : 'desc'
            }
        })
        return trophies
    }
    acquireTrophy = async (uid,trophy) => {
        await this.prisma.player.update({
            where : {uid},
            data : { 
                trophy_name : trophy.name
            }
        })

    }

}