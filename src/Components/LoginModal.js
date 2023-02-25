import React from 'react'
import sha from 'js-sha256';

export default function LoginModal({props}) {

    function formHandler(e){
        e.preventDefault();
        let username = e.target.username.value;
        let password = e.target.password.value;
        let apiUrl = 'https://api.projectnodenium.com/ChatApp/getUUID.php?token=s16ond26&type=u&payload=' + username;

        fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            if (data.status === 'SUCCESS'){
                let uuid = data.payload;
                let apiUrl = 'https://api.projectnodenium.com/ChatApp/user.php';
                fetch(apiUrl,{
                    method: 'POST',
                    body: JSON.stringify({
                        token : 's16ond26',
                        action : 'g',
                        uuid : uuid,
                        payload : {}
                    })
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                    if (data.status === 'SUCCESS'){
                        let user = data.payload;
                        let password = sha(e.target.password.value);
                        if (user.pwd === password){
                            props.setUser(user);
                        }else{
                            alert('Password does not match');
                        }
                    }else{
                        alert('Data Error: ' + data.status);
                    }
                })
                .catch((error) => {
                    alert('Return Error: ' + error);
                }
                );
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
        <div className="login-modal">
            <div className="login-modal-content">
                <div className="login-modal-header">
                    <h2>Login</h2>
                </div>
                <div className="login-modal-body">
                    <form onSubmit={formHandler}>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" name="username" id="username" placeholder="Enter Username" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" id="password" placeholder="Enter Password" required/>
                        </div>
                        <input type="submit" value="Login" className="btn btn-primary btn-block"/>
                    </form>
                </div>
                <div className="login-modal-footer">
                    <a href="#">Forgot password?</a>
                </div>
            </div>
        </div>
    </>
  )
}
