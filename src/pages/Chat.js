import React from 'react'
import FriendsList from '../Components/FriendsList.js';
import ChatPanel from '../Components/ChatPanel.js';

export default function Chat({props}) {
  return (
    <>
        <div className="chat">
            <FriendsList />
            <ChatPanel />
        </div>
    </>
  )
}
