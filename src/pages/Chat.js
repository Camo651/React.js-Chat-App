import React from 'react'
import FriendsList from '../Components/FriendsList.js';
import ChatPanel from '../Components/ChatPanel.js';
import POST from '../ApiHandler.js';

export default function Chat({props}) {
  let myUUID = props.getUser();
  const [currentChat, setCurrentChat] = React.useState(myUUID);
  const [addedFriend, setAddedFriend] = React.useState("");

  async function addFriend(otherUUID){
    let myData = await POST('u', 'rs', undefined, myUUID);
    if(myData.status !== ""){
      alert('Error in adding friend: ' + myData.status);
      return;
    }
    if(myData.payload.dms.includes(otherUUID)){
      alert('You are already friends with this user');
      return;
    }

    myData.payload.dms.push(otherUUID);

    await POST('u', 'w', myData.payload, myUUID);
    await POST('f', 'w', myData.payload.name + " has entered the chat!", myUUID + '_' + otherUUID);
    setAddedFriend(otherUUID);
    changeDm(otherUUID);
  }

  function changeDm(otherUUID){
    if(otherUUID === undefined)
      alert('Error in changing dm');
    if(otherUUID === currentChat){
      return;
    }
    setCurrentChat(otherUUID);
  }
  
  function friendReqNotif(uuid){
    alert('You have a new friend request from ' + uuid + '!');
    setAddedFriend(uuid);
  }
  
  return (
    <>
        <div className="chat">
            <FriendsList key={'friendList_'} myUUID={myUUID} addFriend={addFriend} currentChat={currentChat} changeDm={changeDm} addedFriend={addedFriend}/>
            <ChatPanel key={'chatPanel_'+currentChat} currentChat={currentChat} myUUID={myUUID} friendReqNotif={friendReqNotif}/>
        </div>
    </>
  )
}
