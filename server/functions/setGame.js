import Prisma from '@prisma/client'
const { PrismaClient } = Prisma
const prisma = new PrismaClient()

const words = await prisma.word.findMany({
    where: {
        lastUsed: {
            lte: Date.now() - 18921600
        }
    }
})


const createdGame = await prisma.game.create({
    data: {
        date: Date.now(),
        wordId: Math.floor(Math.random() * words.length)
    }
})

await prisma.word.update({
    where:{
        id: createdGame.wordId
    },
    data: {
        lastUsed: Date.now()
    }
})