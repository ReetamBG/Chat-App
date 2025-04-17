import { useEffect } from "react"
import useChatStore from "../stores/useChatStore"
import ContactsSkeleton from "./skeletons/ContactsSkeleton"
import Contacts from "./Contacts"

const Sidebar = () => {
  const { getUsers, isLoading } = useChatStore()

  useEffect(() => {
    (async () => await getUsers())()
  }, [getUsers])

  return (
    <aside className="min-w-20 md:w-75 h-full shadow-xl bg-base-100 px-3 rounded-xl">
      {isLoading ? <ContactsSkeleton /> : <Contacts />}
    </aside>
  )
}

export default Sidebar