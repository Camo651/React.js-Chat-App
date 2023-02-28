import React from 'react';
import POST from '../ApiHandler.js';

export default function Friend({uuid, changeDm, currentChat}) {

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

  function _changeDm(){
    changeDm(uuid);
  }

  function getID(){
    if(uuid === currentChat)
      return 'friend-selected';
    else
      return 'friend-not-selected';
  }

  return (
    <>
      <div className="friend">
        <button onClick={_changeDm} id={getID()}>{name}</button>
      </div>
    </>
  )
}
