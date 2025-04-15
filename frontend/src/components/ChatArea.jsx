import React, { useEffect, useRef } from 'react'
import useAuthStore from '../stores/useAuthStore'
import useChatStore from '../stores/useChatStore'

const ChatArea = () => {
  const { user} = useAuthStore()
  const {selectedUser, messages, subscribeToMessages, unsubscribeFromMessages } = useChatStore()

  useEffect(() => {
    subscribeToMessages()
    return () => unsubscribeFromMessages()
  }, [subscribeToMessages, unsubscribeFromMessages])

  const chatContainerRef = useRef()

  // to scroll to the bottom when new messages appear
  useEffect(() => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
  }, [messages])

  return (
    <div
      ref={chatContainerRef}
      className="w-full h-full overflow-y-auto hide-scrollbar px-3 md:px-10 scroll-smooth"
    >
      {messages.map((message, idx) => (
        <div key={idx} className="py-1">
          <div className={`chat ${message.senderId === user._id ? "chat-end" : "chat-start"}`}>
            <div className="chat-image avatar">
              <div className="w-8 md:w-10 rounded-full">
                <img
                  alt="avatar"
                  src={`${message.senderId === user._id
                    ? user.profilePicture || "avatar.png"
                    : selectedUser.profilePicture || "avatar.png"}`}
                />
              </div>
            </div>
            <div className="chat-header">
              {`${message.senderId === user._id ? user.name : selectedUser.name}`}
              <time className="text-xs opacity-50">{message.createdAt}</time>
            </div>
            <div
              className={`flex flex-col chat-bubble text-sm
              ${message.senderId !== user._id && "chat-bubble-primary"}`}
            >
              {message.image && <img src={message.image} alt="attachment" className="max-w-25 md:max-w-50 mb-2 rounded-lg" />}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ChatArea