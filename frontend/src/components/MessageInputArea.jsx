import { Image, LoaderCircle, Send, X } from 'lucide-react'
import React, { useRef, useState } from 'react'
import useChatStore from '../stores/useChatStore'

const MessageInputArea = () => {
  const { sendMessage, isSendingMessage } = useChatStore()

  const [inputText, setInputText] = useState("")
  const [inputImage, setInputImage] = useState(null)
  const imageInputRef = useRef()

  const handleInputTextChange = (e) => {
    setInputText(e.target.value)
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()   // create the reader
    reader.readAsDataURL(file)        // convert to Base64 string
    reader.onload = () => {
      setInputImage(reader.result)
    }
  }

  const handleSend = async (e) => {
    e.preventDefault()
    setInputText("")
    setInputImage(null)
    await sendMessage(inputText, inputImage)
  }

  return (
    <div className="w-full p-5">
      {inputImage && (
        <div className="relative">
          <button onClick={() => { setInputImage(null) }} className="absolute left-18 -top-2 rounded-full bg-base-300 cursor-pointer" >
            <X size={20} />
          </button>
          <img src={inputImage} className="size-20 m-2 rounded-lg object-cover" />
        </div>
      )}
      <form onSubmit={handleSend} className="flex gap-3">
        <input value={inputText} onChange={handleInputTextChange} type="text" className="input w-full" placeholder="Type a message" />
        <input ref={imageInputRef} onChange={handleImageChange} type="file" accept="image/*" className="hidden" />
        <button
          type="button"
          onClick={() => { imageInputRef.current.click() }}
          className={`btn size-10 rounded-full p-3 ${inputImage && "border-primary"}`}
        >
          <Image />
        </button>
        <button
          type="submit"
          className={`btn size-10 rounded-full p-3 ${(inputText.trim().length !== 0 || inputImage) && "border-primary-content"}`}
          disabled={inputText.trim().length === 0 && !inputImage}
        >
          {isSendingMessage ? <LoaderCircle className="animate-spin text-base-content" /> : <Send />}
        </button>
      </form>
    </div>
  )
}

export default MessageInputArea