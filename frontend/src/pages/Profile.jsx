import React from 'react'
import useAuthStore from '../stores/useAuthStore'
import { Camera, Mail, UserRound } from 'lucide-react'

const Profile = () => {
  const { user, updateProfile, isLoading } = useAuthStore()
  console.log(user)

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()   // create the reader
    reader.readAsDataURL(file)        // convert to Base64 string
    reader.onload = () => {
      // fileReader.onload() does not support async so we cannot make the function reader.onload = async() => {...}
      // so instead we define an async function inside
      // (if we dont use async properly error handling will go to shit)
      (async () => {
        const base64Image = reader.result
        await updateProfile(base64Image)
      })()
    }
  }

  return (
    <div className="w-full h-[calc(100vh-50px)] flex justify-center items-center">
      <div className="bg-base-300 rounded-2xl flex flex-col items-center w-80 lg:w-120 p-5 h-135">
        <h1 className="text-2xl font-bold">Profile</h1>
        <h3 className="font-medium mb-5">Your profile information</h3>
        <div className="relative">
          <img
            src={user.profilePicture || `avatar.png`}
            alt="profilePicture"
            className={`rounded-full size-30 object-cover ${isLoading ? "animate-pulse" : ""}`} />
          <button>
            <label htmlFor="upload"> {/* This will handle the upload so we can hide the browse file option  */}
              <Camera className="cursor-pointer absolute right-0 bottom-3 text-base-content/60 bg-base-content/30 rounded-full p-2" size={40} />
              <input type="file" accept="image/*" id="upload" onChange={handleImageUpload} className="hidden" />
              {/* <p className="text-sm text-base-content/50">Click on the camera icon to update profile picture</p> */}
            </label>
          </button>
        </div>
        <div className="w-full">
          <p className="flex gap-1 mt-3 mb-1 text-sm"><UserRound size={20} />Name</p>
          <p className="border-2 border-base-content/50 py-1 px-2 rounded-md">{user.name}</p>
        </div>
        <div className="w-full">
          <p className="flex gap-1 mt-3 mb-1 text-sm"><Mail size={20} />Email Address</p>
          <p className="border-2  border-base-content/50 py-1 px-2 rounded-md">{user.email}</p>
        </div>
        <div className="w-full flex flex-col items-center">
          <h3 className="font-medium mb-3 mt-6">Your account information</h3>
          <div className="flex justify-between w-full">
            <p>Member since</p>
            <p>{user.createdAt.split("T")[0]}</p>
          </div>
          <hr className="my-2 w-full text-base-content/30" />
          <div className="flex justify-between w-full">
            <p>Account status</p>
            <p className="text-green-500">Active</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile