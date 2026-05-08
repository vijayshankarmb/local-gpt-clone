import { promises } from 'dns'
import React, { SetStateAction } from 'react'

type props = {
    input: string, 
    setInput: React.Dispatch<SetStateAction<string>>,
    sendMessage: () => Promise<void>
}

const ChatInput = ({input, setInput, sendMessage}: props) => {
    return (
        <>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
        </>
    )
}

export default ChatInput


