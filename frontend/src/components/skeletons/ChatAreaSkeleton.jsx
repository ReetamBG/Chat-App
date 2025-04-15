import React from 'react'

const ChatAreaSkeleton = () => {
  return (
    <div className="w-full px-3 md:px-10">
      {[...Array(3)].map((_, idx) => (
        <div key={idx}>
          <div className="chat chat-start">
            <div className="chat-image avatar skeleton rounded-full">
              <div className="w-10 rounded-full">
                <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
              </div>
            </div>
            <div className="skeleton h-4 w-20 m-1"></div>
            <div className="skeleton h-4 w-28"></div>
          </div>
          <div className="chat chat-end">
            <div className="chat-image avatar skeleton rounded-full">
              <div className="w-10 rounded-full">
                <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
              </div>
            </div>
            <div className="skeleton h-4 w-20 m-1"></div>
            <div className="skeleton h-4 w-28"></div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ChatAreaSkeleton