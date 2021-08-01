import express from 'express'
import Message from '../models/Message.js'
import mongoose from 'mongoose'

const router = express.Router()

// const db = mongoose.connection
// db.once('open', () => {
//   console.log('connected')

// })

router.get('/', (req, res) => {
  res.status(200).send('bruh')
})

router.post('/messages/new', async (req, res) => {
  const dbMessage = req.body
  const message = await Message.create(dbMessage)
  if (!message) {
    console.log('Error')
  } else {
    res.send(message)
  }
})

router.get('/messages/sync', async (req, res) => {
  const messages = await Message.find()
  if (!messages) {
    console.log('Error')
  } else {
    res.send(messages)
  }
})

export default router
