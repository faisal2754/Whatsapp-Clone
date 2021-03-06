import { useEffect, useState } from 'react'
import Pusher from 'pusher-js'
import './styles/App.css'
import Sidebar from './components/Sidebar'
import Chat from './components/Chat'
import axios from './utils/axios'

const App = () => {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    axios.get('/messages/sync').then((res) => {
      setMessages(res.data)
    })
  }, [])

  useEffect(() => {
    const pusher = new Pusher('66621e983b0debdfab47', {
      cluster: 'ap2'
    })

    const channel = pusher.subscribe('messages')
    channel.bind('inserted', (message) => {
      setMessages([...messages, message])
    })

    return () => {
      channel.unbind_all()
      channel.unsubscribe()
    }
  }, [messages])

  console.log(messages)

  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <Chat messages={messages} />
      </div>
    </div>
  )
}

export default App
