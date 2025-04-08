import { useEffect } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import Navbar from "./components/Navbar"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import useAuthStore from "./stores/useAuthStore"
import Settings from "./pages/Settings"
import LoadingIcon from "./components/LoadingIcon"
import useThemeStore from "./stores/useThemeStore"

function App() {

  const { user, checkAuth, isCheckingAuth } = useAuthStore()
  const { theme } = useThemeStore()

  useEffect(() => {
    (async () => await checkAuth())()
  }, [checkAuth])

  if (isCheckingAuth) {
    return <LoadingIcon />
  }

  return (
    <BrowserRouter>
      <Toaster />
      <div data-theme={theme}>
        <Navbar />
        <Routes>
          <Route path="/" element={"Hello"} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="/profile" element={user ? <Profile /> : <Navigate to="/signup" />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
