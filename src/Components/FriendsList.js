import React from 'react'
import Friend from './Friend.js'
import AddFriend from './AddFriend.js'

export default function FriendsList({friends, addFriend, changeDm}) {
    return (
      <>
        <div className="friends-list">
            <AddFriend key='addFriend' addFriend={addFriend}/>
            <h2>Friends</h2>
              {friends.map((friend) => (
                <Friend key={friend} uuid={friend} changeDm={changeDm}/>
              ))}
        </div>  
      </>
    )
}
