import React from 'react'

export default function MessageBar() {
  return (
    <>
        <div className="message-bar">
            <input type="text" placeholder="Type a message..." />
            <button>Send</button>
        </div>
    </>
  )
}
