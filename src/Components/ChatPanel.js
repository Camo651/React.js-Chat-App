import React from 'react'
import MessageBar from './MessageBar.js'
import Message from './Message.js'

export default function ChatPanel() {
  return (
    <>
      <div className="chat-panel">
        <div className="messages-pane">
          <Message />
          <Message />
          <Message />
          <Message />
        </div>
        <MessageBar />
      </div>
    </>
  )
}
