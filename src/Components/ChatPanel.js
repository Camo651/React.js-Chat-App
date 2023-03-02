import React from 'react'
import MessageBar from './MessageBar.js'
import Message from './Message.js'
import POST from '../ApiHandler.js';

export default function ChatPanel({currentChat, myUUID, friendReqNotif}) { // currentChat is the uuid of the current friends dms
  const [messages, stateSetMessages] = React.useState([]);
  const [lastMessage, stateSetLastMessage] = React.useState("");
  const [chatMemebers, stateSetChatMembers] = React.useState(["Loading...", "Loading..."]);

  React.useEffect(() => {
    getMessages();

    return () => {
    }
  },[currentChat]);

  React.useEffect(() => {
    let isAborted = false;
    let intervalTime = 3000;
    const listenLoop = async () => {
      while(true){
        let respTime = await listenForNotifications();
        intervalTime = Math.max(Math.min(respTime * 30, 20000), 1000);
        if(isAborted)
          return;
        // eslint-disable-next-line
        await new Promise(r => setTimeout(r, intervalTime));
      }
    }
    listenLoop();
    return () => {
      isAborted = true;
    }
  },[currentChat, lastMessage]);



  async function getChatMemebers(){
    let name1 = await POST('u', 'r', undefined, myUUID);
    let name2 = await POST('u', 'r', undefined, currentChat);

    if(name1.status !== "")
      name1 = "Loading...";
    else
      name1 = name1.payload.name;
    if(name2.status !== "")
      name2 = "Loading...";
    else
      name2 = name2.payload.name;

    stateSetChatMembers([name1, name2]);
    return [name1, name2];
  }

  async function getMessages(){

    let [name1, name2] = await getChatMemebers();

    let chatId1 = myUUID + '_' + currentChat;
    let chatId2 = currentChat + '_' + myUUID;

    let myData = await POST('f', 'r', undefined, chatId1);
    let otherData = await POST('f', 'r', undefined, chatId2);

    if(myData.status !== "" || otherData.status !== ""){
      alert('Error in getting messages: ' + myData.status + ' ' + otherData.status);
      return;
    }

    let m1 = myData.payload;
    let m2 = otherData.payload;

    let merged = [];

    for(let key in m1){
      let time = m1[key][0];
      let message = m1[key][1];
      merged.push({
          key: key,
          time: time,
          message: message,
          name: name1,
        });
    }
    if(chatId1 !== chatId2)
      for(let key in m2){
        let time = m2[key][0];
        let message = m2[key][1];
        merged.push({
            key: key,
            time: time,
            message: message,
            name: name2,
          });
      }

    merged.sort((a, b) => {
      return a.time - b.time;
    });
    merged.reverse();
    for(let i = 0; i < merged.length; i++){
      merged[i].time = new Date(merged[i].time * 1000).toLocaleString();
      merged[i] = addMessage(merged[i].key, merged[i].time, merged[i].message, merged[i].name, false);
    }
    stateSetMessages(merged);
    stateSetLastMessage(Date.now());
  }


  async function sendMessage(message){
    let sendReq = await POST('f', 'w', message, myUUID + '_' + currentChat)
    let newMsgData = await POST('f', 'r', 1, myUUID + '_' + currentChat);

    if(sendReq.status !== "" || newMsgData.status !== ""){
      alert('Error in sending message: ' + sendReq.status + ' ' + newMsgData.status);
      return;
    }
    let newMessage = newMsgData.payload;
    let newMessageKey = Object.keys(newMessage)[0];
    let newMessageTime = new Date(newMessage[newMessageKey][0] * 1000).toLocaleString();
    let newMessageText = newMessage[newMessageKey][1];
    addMessage(newMessageKey, newMessageTime, newMessageText, chatMemebers[0], true);
    let msgData = {
      "type": "message",
      "payload": {
        "key": newMessageKey,
        "time": newMessage[newMessageKey][0],
        "message": newMessageText,
        "sender": myUUID
      }
    }
    let notification = await POST('n', 'w', msgData, currentChat);
    if(notification.status !== ""){
      alert('Error in sending notification: ' + notification.status);
      return;
    }

    let sent = await POST('e', "New Message", "<p>"+chatMemebers[0] + " said " + newMessageText + " at "+ newMessageTime+"</p>", currentChat);
    if(sent.status !== ""){
      alert('Error in sending notification: ' + sent.status);
      return;
    }
  }

  async function listenForNotifications(){
    let data = await POST('n', 'd', undefined, myUUID);
    let responseTime = data.time;
    if(data.status !== ""){
      return responseTime;
    }
    let notifications = data.payload;
    for(let i = 0; i < notifications.length; i++){
      let notification = notifications[i];
      if(notification.type === "message"){
        let key = notification.payload.key;
        let time = new Date(notification.payload.time*1000).toLocaleString();
        let message = notification.payload.message;
        let sender = notification.payload.sender;
        if(sender !== myUUID && sender === currentChat)
          addMessage(key, time, message, chatMemebers[1], true);
      }
      if(notification.type === "friend"){
        friendReqNotif(notification.payload.uuid);
      }
    }
    return responseTime;
  }

  function addMessage(key, time, message, sender, updateDOM){
    let newMessageElement = <Message key={key} time={time} message={message} name={sender}/>;
    if(updateDOM)
    {
      stateSetMessages([newMessageElement, ...messages]);
      stateSetLastMessage(Date.now());
    }else{
      return newMessageElement;
    }
  }

  return (
    <>
      <div className="chat-panel">
        <div className="messages-pane">
          {messages}
        </div>
        <MessageBar key={lastMessage} addMessage={sendMessage}/>
      </div>
    </>
  )
}
