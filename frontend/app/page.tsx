'use client'

import React from 'react'
import { useState } from 'react'

const Home = () => {
  const [input, setInput] = useState<string>("")
  const [aiRes, setAiRes] = useState<string>("")

  const sendMessage = async () => {
    const res = await fetch("http://localhost:8000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: input, session_id: 1 })
    })
    const data = await res.json()
    setAiRes(data.response)
  }

  return (
    <>
      <h1>Chat bot</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
      <p>AI: {aiRes}</p>
    </>
  )
}

export default Home


