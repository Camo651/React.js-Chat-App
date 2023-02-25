import React from 'react'

export default function Message({sender, message, time}) {
  return (
    <>
      <div className="message">
        <div className="message-header">
          <div className="message-header-info">
            <h3>{sender}</h3><p>{time}</p>
          </div>
        </div>
        <div className="message-body">
          <p>{message}</p>
        </div>
      </div>
    </>
  )
}
