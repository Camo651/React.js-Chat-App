import React from 'react'

export default function Message({name, message, time, isMe}) {
  return (
    <>
      <div className="message">
        <div className="message-header">
          <div className="message-header-info">
            <h3>{name}</h3><p>{time}</p>
          </div>
        </div>
        <div className="message-body">
          <p>{message}</p>
        </div>
      </div>
    </>
  )
}
