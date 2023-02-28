import React from 'react'
import Friend from './Friend.js'
import AddFriend from './AddFriend.js'
import POST from '../ApiHandler.js'

export default function FriendsList({myUUID, addFriend, changeDm, currentChat}) {
  
  const [friendsList, setFriendsList] = React.useState([]);

  React.useEffect(() => {
    loadFriendsAsync();
  });

  function getFriends(){
    if(friendsList.then !== undefined){
      loadFriendsAsync();
      return (<p>Loading...</p>);
    }
    if(friendsList.length === 0 || friendsList === undefined){
      return (<p>You have no friends</p>);
    }

    return friendsList.map((friend) => {
      return <Friend key={friend} uuid={friend} changeDm={changeDm} currentChat={currentChat}/>
    })
  }

  async function loadFriendsAsync(){
    let data = await POST('u', 'r', undefined, myUUID);
    if(data.status !== ""){
      alert('Error in getting friends: ' + data.status);
      return;
    }
    let friends = data.payload.dms;
    setFriendsList(friends);
  }

    return (
      <>
        <div className="friends-list">
            <AddFriend key='addFriend' addFriend={addFriend}/>
            <h2>Friends</h2>
            {getFriends()}
        </div>  
      </>
    )
}
