import { MessageSquare } from "lucide-react"

const NoChatSelected = () => {
  return (
    <div className="mx-auto bg-base-100 h-full w-full ms-1 rounded-xl flex flex-col justify-center items-center px-10">
      <div className="bg-accent/20 py-1.5 px-2 rounded-lg mb-5 animate-bounce">
        <MessageSquare size={50} />
      </div>
      <h3 className="text-2xl font-bold mb-2 text-center">Welcome to ReeChat !</h3>
      <p className="text-base-content/70 text-sm text-center">Select a conversation from the sidebar to start chatting</p>
    </div>
  )
}

export default NoChatSelected