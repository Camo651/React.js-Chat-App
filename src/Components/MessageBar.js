import React from 'react'

export default function MessageBar({addMessage}) {
  return (
    <>
        <div className="message-bar">
          <form onSubmit={(e) => {
                e.preventDefault();
                addMessage(e.target[0].value);
                e.target[0].value = "";
                e.target[0].focus();
                e.target[0].select();
              }}>
            <input type="text" placeholder="Type a message..." />
            <button>Send</button>
          </form>
        </div>
    </>
  )
}
