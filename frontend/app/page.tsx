'use client'

import React from 'react'
import { useState, useEffect } from 'react'

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
      <h1>Chat bot</h1>
      <p>Sessions:</p>
      <select
        value={sessionId}
        onChange={(e) => setSessionId(Number(e.target.value))}
      >
        <option value="">Select a session</option>
        {sessions.map((session) => (
          <option key={session.id} value={session.id}>
            Session {session.id}
          </option>
        ))}
      </select>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
      <div>
        {messages.map((message, index) => {
          return (
            <p key={index}>
              <strong>{message.role}:</strong> {message.content}
            </p>
          )
        })}
      </div>
    </>
  )
}

export default Home


