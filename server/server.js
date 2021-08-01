import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Pusher from 'pusher'
import cors from 'cors'
import router from './routes/routes.js'
import Message from './models/Message.js'

// env config
dotenv.config()

// app config
const app = express()
app.use(express.json())
app.use(cors())
app.use('', router)

const pusher = new Pusher({
  appId: '1243528',
  key: '66621e983b0debdfab47',
  secret: process.env.PUSHER_SECRET,
  cluster: 'ap2',
  useTLS: true
})

// port
const port = process.env.PORT || 5000

mongoose.connect(
  process.env.DB_CONNECT,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
  },
  () => {
    console.log('Connected to db')
    const changeStream = Message.watch()
    changeStream.on('change', (change) => {
      console.log(change)

      if (change.operationType === 'insert') {
        const messageDetails = change.fullDocument
        pusher.trigger('messages', 'inserted', {
          _id: messageDetails._id,
          name: messageDetails.name,
          message: messageDetails.message,
          timestamp: messageDetails.timestamp,
          received: messageDetails.received
        })
      } else {
        console.log('Error with Pusher')
      }
    })
  }
)

app.listen(port, () => {
  console.log(`Server running at port ${port}`)
})
