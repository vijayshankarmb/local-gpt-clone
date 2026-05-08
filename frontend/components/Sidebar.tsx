import React, { SetStateAction } from 'react'

type Session = {
    id: number
    created_at: string
}

type props = {
    sessions: Session[]
    sessionId: number | undefined
    setSessionId: React.Dispatch<SetStateAction<number | undefined>>
}

const Sidebar = ({
    sessionId,
    setSessionId,
    sessions
}: props) => {
  return (
    <div className='p-4 w-64 h-screen overflow-y-scroll border-r border-gray-300'>
        <h1>Chats</h1>
        {sessions.map((session) => (
            <div key={session.id}
            onClick={()=>setSessionId(session.id)}
            className='p-2 cursor-pointer hover:bg-gray-200'
            >
                session {session.id}
            </div>
        ))}
    </div>
  )
}

export default Sidebar