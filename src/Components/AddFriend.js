import React from 'react'
import POST from '../ApiHandler.js';

export default function AddFriend({addFriend}) {
    React.useEffect(() => {
        let input = document.querySelector('.add-friend-input');
        input.style.display = "none";
    }, []);
    function showNavigation(){
        let input = document.querySelector('.add-friend-input');
        if (input.style.display === "none"){
            input.style.display = "block";
        }else{
            input.style.display = "none";
        }
        document.getElementById("showAddFriendButton").innerHTML = input.style.display === "none" ? "+" : "x";
    }

    async  function formHandler(e){
        e.preventDefault();
        let username = e.target.username.value;
        let uuid = await POST('g', 'u', username, undefined);
        if(uuid.status !== ""){
            alert('Error in adding friend: ' + uuid.status);
            return;
        }
        addFriend(uuid.payload);
    }

    return (
        <>
            <div className="add-friend">
                <div className="add-friend-button">
                    <button onClick={showNavigation} id="showAddFriendButton">+</button>
                </div>
                <div className="add-friend-input">
                    <form onSubmit={formHandler}>
                        <input type="text" placeholder="Add Friend" name="username"/>
                        <button type="submit">+</button>
                    </form>
                </div>
            </div>
        </>
    )
}
