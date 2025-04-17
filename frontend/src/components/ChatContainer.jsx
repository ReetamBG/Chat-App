import { MessageSquare } from "lucide-react"
import useChatStore from "../stores/useChatStore"
import ChatHeader from "./ChatHeader"
import ChatArea from "./ChatArea"
import MessageInputArea from "./MessageInputArea"
import ChatAreaSkeleton from "./skeletons/ChatAreaSkeleton"
import { useEffect } from "react"

const ChatContainer = () => {

  const { selectedUser, isLoading, getMessages } = useChatStore()

  useEffect(() => {
    (async () => {
      await getMessages(selectedUser._id)
    })()
  }, [getMessages, selectedUser])

  return (
    <div className="mx-auto bg-base-100 h-full w-full ms-1 rounded-xl flex flex-col justify-between items-center min-w-50">
      <ChatHeader selectedUser={selectedUser} />
      {isLoading ? <ChatAreaSkeleton /> : <ChatArea />}
      <MessageInputArea />
    </div>
  )
}

export default ChatContainer