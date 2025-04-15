import { LogIn, LogOut, MessageSquare, Settings, User } from "lucide-react"
import useAuthStore from "../stores/useAuthStore"
import { NavLink } from "react-router-dom"

const Navbar = () => {
  const { user, logout } = useAuthStore()
  return (
    <div className="w-full flex justify-between items-center py-2 px-5 sm:px-20 lg:px-30 shadow-md">
      <NavLink to="/">
        <div className="flex gap-5 cursor-pointer items-center">
          <div className="bg-accent/20 py-1.5 px-2 rounded-lg">
          <MessageSquare size={20}/>
          </div>
          <p className="font-bold">ReeChat</p>
        </div>
      </NavLink>
      <div>
        <nav className="flex gap-1 sm:gap-3">
          {user ? (
            <>
              <NavLink to="/profile"><button className="btn h-7 rounded-full"><User size={15} />
                <span className="hidden sm:block">Profile</span></button></NavLink>
              <button onClick={logout} className="btn h-7 rounded-full"><LogOut size={15} />
                <span className="hidden sm:block">Logout</span></button>
            </>
          ) : (
            <>
              <NavLink to="/login"><button className="btn h-7 rounded-full"><LogIn size={15} />
                <span className="hidden sm:block">Login</span></button></NavLink>
              <NavLink to="/signup"><button className="btn h-7 rounded-full"><User size={15} />
                <span className="hidden sm:block">Signup</span></button></NavLink>
            </>
          )}
          <NavLink to="/settings"><button className="btn h-7 rounded-full"><Settings size={15} />
            <span className="hidden sm:block">Themes</span></button></NavLink>
        </nav>
      </div>
    </div>
  )
}

export default Navbar