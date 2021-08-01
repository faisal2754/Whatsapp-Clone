import { Avatar, IconButton } from '@material-ui/core'
import {
  AttachFile,
  InsertEmoticon,
  Mic,
  SearchOutlined
} from '@material-ui/icons'
import MoreVert from '@material-ui/icons/MoreVert'
import { useState } from 'react'
import '../styles/Chat.css'
import axios from '../utils/axios'

const Chat = ({ messages }) => {
  const [input, setInput] = useState('')

  const sendMessage = async (e) => {
    e.preventDefault()

    await axios.post('/messages/new', {
      message: input,
      name: 'Test Name',
      timestamp: 'Test timestamp',
      received: false
    })

    setInput('')
  }

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />

        <div className="chat__headerInfo">
          <h3>Room name</h3>
          <p>Last seen at ...</p>
        </div>

        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="chat__body">
        {messages.map((message) => {
          return (
            <p
              key={message._id}
              className={`chat__message ${
                message.received && 'chat__receiver'
              }`}>
              <span className="chat__name">{message.name}</span>
              {message.message}
              <span className="chat__timestamp">{message.timestamp}</span>
            </p>
          )
        })}
      </div>

      <div className="chat__footer">
        <InsertEmoticon />
        <form>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
          />
          <button type="submit" onClick={sendMessage}>
            Send
          </button>
        </form>
        <Mic />
      </div>
    </div>
  )
}

export default Chat
