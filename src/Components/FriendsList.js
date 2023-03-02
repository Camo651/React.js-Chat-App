import React from 'react'
import Friend from './Friend.js'
import FriendRequest from './FriendRequest.js'
import AddFriend from './AddFriend.js'
import POST from '../ApiHandler.js'

export default function FriendsList({myUUID, addFriend, changeDm, currentChat, addedFriend}) {
  
  const [friendsList, setFriendsList] = React.useState([]);
  const [requestsList, setRequestsList] = React.useState([]);

  React.useEffect(() => {
    loadFriendsAsync();
    loadRequestsAsync();
  },[]);

  React.useEffect(() => {
    console.log("reloading friends")
    if(addedFriend !== ""){
      loadFriendsAsync();
      loadRequestsAsync();
    }
  },[addedFriend]);


  function getFriends(){
    if(friendsList.then !== undefined){
      loadFriendsAsync();
      return (<p>Loading...</p>);
    }
    if(friendsList.length === 0 || friendsList === undefined){
      return (<p>Add some friends to chat!</p>);
    }

    return friendsList.map((friend) => {
      return <Friend key={friend} uuid={friend} changeDm={changeDm} currentChat={currentChat}/>
    })
  }

  async function loadFriendsAsync(){
    let data = await POST('u', 'rs', undefined, myUUID);
    if(data.status !== ""){
      alert('Error in getting friends: ' + data.status);
      return;
    }
    let friends = data.payload.dms;
    setFriendsList(friends);
  }

  async function respondToRequest(uuid, accept){
      if(accept)
          addFriend(uuid);
      POST('u', '-a', ["reqs", uuid], myUUID)
      loadRequestsAsync();
      loadFriendsAsync();
  }

  function getRequests(){
    if(requestsList.then !== undefined){
      loadRequestsAsync();
      return (<p>Loading...</p>);
    }
    if(requestsList.length === 0 || requestsList === undefined){
      return (<p>Nothing yet..</p>);
    }

    return requestsList.map((friend) => {
      return <FriendRequest key={friend} uuid={friend} respondToRequest={respondToRequest}/>
    })
  }

  async function sendFriendRequest(otherUUID){
    let myData = await POST('u', 'rs', undefined, myUUID);
    let sent = await POST('e', 'New Friend!', "<h1>"+myData.payload.name + " has added you as a friend!</h1>", otherUUID);
    await POST('u', 'a', ["reqs", myUUID], otherUUID)
    let msgData = {
      "type": "friend",
      "payload": {
        "uuid": myUUID
      }
    }
    await POST('n', 'w', msgData, otherUUID);

    if(sent.status !== ""){
      alert('Error in sending friend request: ' + sent.status);
      return;
    }
    addFriend(otherUUID);
  }

  async function loadRequestsAsync(){
    let data = await POST('u', 'rs', undefined, myUUID);
    if(data.status !== ""){
      alert('Error in getting requests: ' + data.status);
      return;
    }
    let requests = data.payload.reqs;
    if(requests === undefined)
      requests = [];
    setRequestsList(requests);
  }

    return (
      <>
        <div className="friends-list">
            <AddFriend key='addFriend' addFriend={sendFriendRequest}/>
            <h2>Requests</h2>
            {getRequests()}
            <h2>Friends</h2>
            {getFriends()}
        </div>  
      </>
    )
}
