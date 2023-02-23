import React, { useState, useRef, useEffect} from 'react';

export default function Friend() {

  const [friends, setFriends] = useState([]);

  return (
    <>
        <li>
            <div className="friend">
                <img src=""/>
                <div className="friend-info">
                    <h3>Friend's Name</h3>
                </div>
            </div>
        </li>
    </>
  )
}
