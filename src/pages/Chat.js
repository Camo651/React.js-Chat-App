import React from 'react'
import FriendsList from '../Components/FriendsList.js';
import ChatPanel from '../Components/ChatPanel.js';

export default function Chat({props}) {
  const [currentChat, stateSetCurrentChat] = React.useState([]);

  React.useEffect(() => {
    changeDm(props.getUser().uuid);
  }, []);

  let user = props.getUser();
  let friends = user.dms;

  function getCurrentChat(){
    if(friends.length === 0)
      return props.uuid;
    return currentChat;
  }

  function addFriend(uuid){
    let newUserData = {...user};
    newUserData.dms.push(uuid);

    let apiUrl = 'https://api.projectnodenium.com/ChatApp/user.php';

    // add other to this user's friends list
    fetch(apiUrl,{
        method: 'POST',
        body: JSON.stringify({
          token: 's16ond26',
          action: 's',
          uuid: user.uuid,
          payload: newUserData
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        if (data.status === 'SUCCESS'){
            console.log('Success');
        }else{
            alert('Data Error: ' + data.status);
        }
    })
    .catch((error) => {
        alert('Return Error: ' + error);
    }
    );

    // add this user to other's friends list
    fetch(apiUrl,{
      method: 'POST',
      body: JSON.stringify({
        token: 's16ond26',
        action: 's',
        uuid: user.uuid,
        payload: newUserData
      })
  })
  .then(response => response.json())
  .then(data => {
      console.log('Success:', data);
      if (data.status === 'SUCCESS'){
          console.log('Success');
      }else{
          alert('Data Error: ' + data.status);
      }
  })
  .catch((error) => {
      alert('Return Error: ' + error);
  }
  );

    props.setUser(newUserData);
  }

  function changeDm(uuid){
    stateSetCurrentChat(uuid);
  }

  return (
    <>
        <div className="chat">
            <FriendsList key='friendsList' friends={friends} addFriend={addFriend} changeDm={changeDm}/>
            <ChatPanel key='chatpanel' currentChat={getCurrentChat()} myUUID={[user.uuid]}/>
        </div>
    </>
  )
}
