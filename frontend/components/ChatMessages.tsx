import React from 'react'

type Message = {
    role: "user" | "assistant",
    content: string
}

type props = {
    messages: Message[]
}

const ChatMessages = ({ messages }: props) => {
    return (
        <div>
            {messages.map((message, index) => {
                return (
                    <p key={index}>
                        <strong>{message.role}:</strong> {message.content}
                    </p>
                )
            })}
        </div>
    )
}

export default ChatMessages

