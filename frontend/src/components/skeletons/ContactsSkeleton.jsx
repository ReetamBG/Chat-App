import { Contact } from 'lucide-react'
import React from 'react'

const MessagesSkeleton = () => {
  return (
    <>
      <h3 className="flex gap-2 py-5 pl-4 justify-start items-center">
        <Contact />
        <p className="hidden md:block font-medium">Contacts</p>
      </h3>
      <hr className="" />
    <div className="flex w-15 md:w-75 flex-col gap-3 mt-3">
      {[...Array(4)].map((_, idx) => (
      <div key={idx} className="flex items-center gap-4">
        <div className="skeleton size-12 shrink-0 rounded-full"></div>
        <div className="flex flex-col gap-4">
          <div className="skeleton h-3 w-28 hidden md:block"></div>
          <div className="skeleton h-3 w-20 hidden md:block"></div>
        </div>
      </div>
      ))}
    </div>
    </>
  )
}

export default MessagesSkeleton