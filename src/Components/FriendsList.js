import React from 'react'
import Friend from './Friend.js'

export default function FriendsList() {
  return (
    <div>
        <div className="friends-list">
            <h2>Friends</h2>
            <ul>
                <Friend />
                <Friend />
                <Friend />
            </ul>
        </div>  
    </div>
  )
}
