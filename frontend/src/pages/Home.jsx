import Sidebar from "../components/Sidebar.jsx"
import ChatContainer from "../components/ChatContainer.jsx"
import useChatStore from "../stores/useChatStore.js"
import NoChatSelected from "../components/NoChatSelected.jsx"


const Home = () => {

  const {selectedUser} = useChatStore()

  return (
    <div className="w-full h-[calc(100vh-50px)] flex justify-center items-center bg-base-300">
      <div className="h-full w-full px-2 md:px-10 py-5 flex justify-center items-center">
        <Sidebar />
        {selectedUser ? <ChatContainer /> : <NoChatSelected />}
      </div>
    </div>
  )
}

export default Home