import React from 'react'
import POST from '../ApiHandler.js'

export default function FriendRequest({uuid, respondToRequest}) {

    const [name, setName] = React.useState('Loading...');
    React.useEffect(() => {
      getName();
    }, []);
    function getName(){
      POST('u', 'r', undefined, uuid)
      .then(data => {
        setName(data.payload.name);
      })
    }
    return (
      <div className="friend-request">
          <p>{name}</p>
          <button onClick={() => respondToRequest(uuid, true)}>Accept</button>
            <button onClick={() => respondToRequest(uuid, false)}>Decline</button>
      </div>
    )
}
