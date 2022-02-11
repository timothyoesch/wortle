import Prisma from '@prisma/client'
const { PrismaClient } = Prisma
const prisma = new PrismaClient()

const resetWords = await prisma.word.updateMany({
    where: {
        id: {
            lte: 5000
        }
    },
    data: {
        lastUsed: Date.now() - 18921600
    }
})

console.log(resetWords)