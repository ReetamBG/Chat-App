import { Contact } from 'lucide-react'
import useAuthStore from '../stores/useAuthStore'
import useChatStore from '../stores/useChatStore'
import { useState } from 'react'

const Users = () => {
  const { users, selectedUser, setSelectedUser } = useChatStore()
  const { onlineUsers } = useAuthStore()

  const [showOnlineOnly, setShowOnlineOnly] = useState(false)

  const filteredUsers = showOnlineOnly ? users.filter(user => onlineUsers.includes(user._id)) : users

  return (
    <>
      <h3 className="flex flex-col gap-3 py-5 pl-4 justify-center items-start">
        <div className="flex gap-2">
          <Contact />
          <p className="hidden md:block font-medium transition-all">Contacts</p>
        </div>
        <div className="hidden md:flex gap-2 justify-center">
          <input
            type="checkbox"
            checked={showOnlineOnly}
            onChange={(e) => { setShowOnlineOnly(e.target.checked) }}
            className="checkbox checkbox-primary checkbox-xs rounded-sm"
          />
          <p className="text-base-content/70 text-xs"><pre>Show online only ({onlineUsers.length - 1})</pre></p>
        </div>
      </h3>
      <hr className="" />
      {filteredUsers.map(user => (
        <div
          key={user._id}
          className={`relative flex gap-3 hover:bg-base-300 p-2 cursor-pointer
        my-1 rounded-lg ${user === selectedUser ? "bg-base-300" : ""}`}
          onClick={() => setSelectedUser(user)}
        >
          <img src={user.profilePicture || "avatar.png"} className="rounded-full object-cover size-10" />
          <div className={`absolute top-2 left-1 size-3 rounded-full  
          ${onlineUsers.includes(user._id)
              ? "bg-green-500 border-1 border-base-300"
              : "bg-transparent"}`}
          >
          </div>
          <div className="hidden md:block ">
            <p className="font-medium">{user.name}</p>
            <p className="text-xs">{onlineUsers.includes(user._id) ? "Online" : "Offline"}</p>
          </div>
        </div>
      ))}
      <p className="hidden md:block mt-10 text-center text-base-content/70">
      {filteredUsers.length === 0 && "No online users"}
      </p>
    </>
  )
}

export default Users