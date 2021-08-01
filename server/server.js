import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Pusher from 'pusher'
import router from './routes/routes.js'

// env config
dotenv.config()

// app config
const app = express()
app.use(express.json())
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
  }
)

app.listen(port, () => {
  console.log(`Server running at port ${port}`)
})
