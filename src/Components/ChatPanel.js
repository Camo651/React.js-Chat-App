import React from 'react'
import MessageBar from './MessageBar.js'
import Message from './Message.js'

const apiUrl = 'https://api.projectnodenium.com/ChatApp/feed.php';
export default function ChatPanel({currentChat, myUUID}) { // currentChat is the uuid of the current friends dms
  const [messages, stateSetMessages] = React.useState([]);

  React.useEffect(() => {
    getMessages();
  }, []);

  async function getMessages(){
    console.log(myUUID + '_' + currentChat);
    let myData = [], otherData = [];
    let fet = await fetch(apiUrl,{
        method: 'POST',
        body: JSON.stringify({
          token: 's16ond26',
          action: 'r',
          payload: 10000,
          feed: myUUID + '_' + currentChat
    })})
    
    let data = await fet.json();
    if (data.status === 'SUCCESS'){
      myData = data.payload;
    }else{
      alert('Data Error: ' + data.status);
    }

    fet = await fetch(apiUrl,{
      method: 'POST',
      body: JSON.stringify({
        token: 's16ond26',
        action: 'r',
        payload: 10000,
        feed: currentChat + '_' + myUUID
    })})

    data = await fet.json();
    if (data.status === 'SUCCESS'){
      otherData = data.payload;
    }else{
      alert('Data Error: ' + data.status);
    }


    stateSetMessages(merged);
  }

  return (
    <>
      <div className="chat-panel">
        <div className="messages-pane">
          {messages}
        </div>
        <MessageBar />
      </div>
    </>
  )
}
