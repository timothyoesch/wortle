import Prisma from '@prisma/client'
import express, { response } from 'express'
import cors from "cors"

const { PrismaClient } = Prisma

const prisma = new PrismaClient()

const app = express()
const port = 3600

app.use(cors())


app.get('/get-gamedata', async (req, res) => {
    express.json()
    var ip = req.ip ||
             req.headers['x-forwarded-for'] ||
             req.connection.remoteAddress ||
             req.socket.remoteAddress ||
             req.connection.socket.remoteAddress;

    if (ip !== "127.0.0.1" && ip !== "::1") {
      res.status(401).send("401 Unauthorized Access")
    } else {
      let game = await prisma.game.findFirst({
        include: {
          word: true
        }
      })

      res.send(game)
    }

})


app.get('/check-word', async (req, res) => {
    // express.json()
    var ip = req.ip ||
             req.headers['x-forwarded-for'] ||
             req.connection.remoteAddress ||
             req.socket.remoteAddress ||
             req.connection.socket.remoteAddress;

    if (ip !== "127.0.0.1" && ip !== "::1") {
      res.status(401).send("401 Unauthorized Access")
    } else {
      let word = req.query.word

      let dbword = await prisma.word.findMany({
        where: {
          word: word
        }
      })

      let response
      if (!dbword[0]) {
        response = false
      } else {
        response = true
      }

      res.send(response)
    }

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})