import React from 'react'
import MessageBar from './MessageBar.js'
import Message from './Message.js'

export default function ChatPanel() {
  return (
    <div>
      <div className="chat-panel">
        <Message />
        <Message />
        <Message />
        <Message />
      </div>
      <MessageBar />
    </div>
  )
}
