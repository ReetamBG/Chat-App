import useChatStore from '../stores/useChatStore'
import useAuthStore from '../stores/useAuthStore'
import { X } from 'lucide-react'

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore()
  const { onlineUsers } = useAuthStore()

  return (
    <div className="w-full flex justify-between items-center py-3 shadow-md px-5">
      <div className="flex gap-3 relative">
        <div className={`absolute size-3 rounded-full 
         ${onlineUsers.includes(selectedUser._id)
            ? "bg-green-500 border-1 border-base-300"
            : "bg-transparent"}`}
        >
        </div>
        <img src={selectedUser.profilePicture || "avatar.png"} alt="profile picture" className="size-10 rounded-full object-cover" />
        <div className="flex flex-col">
          <p className="font-medium">{selectedUser.name}</p>
          <p className="text-xs text-base-content/50">
            {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
          </p>
        </div>
      </div>
      <button className="cursor-pointer" onClick={() => setSelectedUser(null)}><X /></button>
    </div>
  )
}

export default ChatHeader