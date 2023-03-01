import React from 'react'
import sha from 'js-sha256';
import POST from '../ApiHandler.js';
export default function LoginModal({props}) {

    async function formHandler(e){
        e.preventDefault();
        let username = e.target.username.value;
        let password = sha(e.target.password.value);
        let uuid = await POST('g', 'u', username, undefined);
        uuid = uuid.payload;
        let userData = await POST('u', 'rs', undefined, uuid);
        let truePass = userData.payload.pwd;
        if(userData.status !== ""){
            alert('Error in login: ' + userData.status);
            return;
        }
        if (truePass === password){
            props.changeUser(uuid);
        }else{
            alert('Incorrect password');
        }
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
