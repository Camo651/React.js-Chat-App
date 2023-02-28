import React from 'react'
import FriendsList from '../Components/FriendsList.js';
import ChatPanel from '../Components/ChatPanel.js';
import POST from '../ApiHandler.js';

export default function Chat({props}) {
  let myUUID = props.getUser();
  const [currentChat, setCurrentChat] = React.useState(myUUID);

  async function addFriend(otherUUID){
    let myData = await POST('u', 'r', undefined, myUUID);
    let otherData = await POST('u', 'r', undefined, otherUUID);

    if(myData.status !== "" || otherData.status !== ""){
      alert('Error in adding friend: ' + myData.status + ' ' + otherData.status);
      return;
    }

    if(myData.payload.dms.includes(otherUUID) || otherData.payload.dms.includes(myUUID)){
      alert('You are already friends with this user');
      return;
    }

    myData.payload.dms.push(otherUUID);
    otherData.payload.dms.push(myUUID);

    let otherEmail = otherData.payload.email;

    // TODO send email to other user to notify them of the new dm

    await POST('u', 'w', myData.payload, myUUID);
    await POST('u', 'w', otherData.payload, otherUUID);

    await POST('f', 'w', "Hi!, I'm " + myData.payload.name + ".", myUUID + '_' + otherUUID);
    await POST('f', 'w', "Hi!, I'm " + otherData.payload.name + ".", otherUUID + '_' + myUUID);

    changeDm(otherUUID);
  }

  function changeDm(otherUUID){
    if(otherUUID === undefined)
      alert('Error in changing dm');
    if(otherUUID === currentChat)
      return;
    setCurrentChat(otherUUID);
  }
  
  return (
    <>
        <div className="chat">
            <FriendsList key={'friendList_'+currentChat} myUUID={myUUID} addFriend={addFriend} currentChat={currentChat} changeDm={changeDm}/>
            <ChatPanel key={'chatPanel_'+currentChat} currentChat={currentChat} myUUID={myUUID}/>
        </div>
    </>
  )
}
