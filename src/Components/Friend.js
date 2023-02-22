import React, { useState, useRef, useEffect} from 'react';

export default function Friend() {

  const [friends, setFriends] = useState([]);
  
  function initFriendsFromDB(){
    
  }

  return (
    <div>
        <li>
            <div className="friend">
                <img src=""/>
                <div className="friend-info">
                    <h3>Friend's Name</h3>
                    <p>Friend's status</p>
                </div>
            </div>
        </li>
    </div>
  )
}
