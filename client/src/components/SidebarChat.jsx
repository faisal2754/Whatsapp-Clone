import { Avatar } from '@material-ui/core'
import '../styles/SidebarChat.css'

const SidebarChat = () => {
  return (
    <div className="sidebarChat">
      <Avatar />
      <div className="sidebarChat__info">
        <h2>Room name</h2>
        <p>Recent message</p>
      </div>
    </div>
  )
}

export default SidebarChat
