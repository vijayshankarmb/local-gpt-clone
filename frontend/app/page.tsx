'use client'

import React from 'react'
import { useState, useEffect } from 'react'
import ChatMessages from '@/components/ChatMessages'
import ChatInput from '@/components/ChatInput'
import Sidebar from '@/components/Sidebar'

type Message = {
  role: "user" | "assistant",
  content: string
}

type Session = {
  id: number
  created_at: string
}

const Home = () => {
  const [input, setInput] = useState<string>("")
  const [messages, setMessages] = useState<Message[]>([])
  const [sessionId, setSessionId] = useState<number>()
  const [sessions, setSessions] = useState<Session[]>([])

  const sendMessage = async () => {
    if (sessionId === undefined) return
    setMessages((prev) => [...prev, { role: "user", content: input }])
    const res = await fetch("http://localhost:8000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: input, session_id: sessionId })
    })
    setInput("")
    const data = await res.json()
    setMessages((prev) => [...prev, { role: "assistant", content: data.response }])
  }

  const fetchHistory = async () => {
    if (sessionId === undefined) return
    const res = await fetch(`http://localhost:8000/history/${sessionId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await res.json()
    console.log(data)
    setMessages(data)
  }

  const fetchSession = async () => {
    const res = await fetch("http://localhost:8000/session/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await res.json()
    setSessionId(data.session_id)
    fetchSessions()
  }

  const fetchSessions = async () => {
    const res = await fetch("http://localhost:8000/sessions", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await res.json()
    console.log(data)
    setSessions(data)
  }

  useEffect(() => {
    fetchSession()
  }, [])

  useEffect(() => {
    fetchHistory()
  }, [sessionId])

  return (
    <>
      <div className='flex'>
        <Sidebar sessions={sessions} sessionId={sessionId} setSessionId={setSessionId} />
        <div className='p-4 flex-1 overflow-y-scroll'>
          <h1 className='text-2xl font-bold'>Chat bot</h1>
          <ChatInput input={input} setInput={setInput} sendMessage={sendMessage} />
          <ChatMessages messages={messages} />
        </div>
      </div>
    </>
  )
}

export default Home


