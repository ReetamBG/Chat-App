import React, { useState } from 'react'
import { Eye, EyeOff, LoaderCircle } from 'lucide-react'
import useAuthStore from "../stores/useAuthStore"
import { NavLink } from 'react-router-dom'
import AuthPageDesign from '../components/AuthPageDesign'

const Login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const togglePasswordVisible = (e) => {
    e.preventDefault()
    setIsPasswordVisible(!isPasswordVisible)
  }

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const { login, isLoading } = useAuthStore()
  const handleFormSubmit = async (e) => {
    e.preventDefault()
    await login(formData)
  }

  return (
    <div className="w-full h-[calc(100vh-50px)] flex justify-center items-center">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div>
          <form onSubmit={handleFormSubmit}>
            <fieldset className="fieldset text-center w-xs bg-base-200 border border-base-300 p-4 rounded-box">
              <legend className="fieldset-legend">LOGIN</legend>
              <label className="fieldset-label">Email</label>
              <input
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                type="email"
                className="input"
                placeholder="johndoe@gmail.com" />

              <label className="fieldset-label">Password</label>
              <div className="relative">
                <input
                  name="password"
                  value={formData.password}
                  onChange={handleFormChange}
                  type={isPasswordVisible ? "text" : "password"}
                  className="input"
                  placeholder="* * * * * *"
                />
                {isPasswordVisible ? (
                  <button onClick={togglePasswordVisible}>
                    <Eye className="absolute right-0 top-0 mt-2 mr-3 text-base-content/50 cursor-pointer" />
                  </button>
                ) : (
                  <button onClick={togglePasswordVisible}>
                    <EyeOff className="absolute right-0 top-0 mt-2 mr-3 text-base-content/50 cursor-pointer" />
                  </button>
                )}
              </div>
              <button type="submit" className="btn btn-outline my-5">
              {isLoading ?  (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  "Login"
                )}
              </button>
              <p>
                Don't have an account? <NavLink to="/signup" className="text-primary hover:underline">Signup</NavLink>
              </p>
            </fieldset>
          </form>
        </div>
        <div className="hidden lg:block">
          <AuthPageDesign />
        </div>
      </div>
    </div>
  )
}

export default Login