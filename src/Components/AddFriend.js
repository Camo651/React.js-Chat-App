import React from 'react'

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

    function formHandler(e){
        e.preventDefault();
        let username = e.target.username.value;
        let apiUrl = 'https://api.projectnodenium.com/ChatApp/getUUID.php';

        fetch(apiUrl,{
            method: 'POST',
            body: JSON.stringify({
                token : 's16ond26',
                type : 'u',
                payload : username
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            if (data.status === 'SUCCESS'){
                let uuid = data.payload;
                addFriend(uuid);
            }else{
                alert('Data Error: ' + data.status);
            }
        })
        .catch((error) => {
            alert('Return Error: ' + error);
        }
        );
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
