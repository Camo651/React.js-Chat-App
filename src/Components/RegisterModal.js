import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import sha from 'js-sha256';

export default function RegisterModal({props}) {

    function formHandler(e){
        e.preventDefault();
        let username = e.target.username.value;
        let email = e.target.email.value;
        let password = sha(e.target.password.value);
        let password2 = sha(e.target.password2.value);
        if (password !== password2){
            alert('Passwords do not match');
            return;
        }

        let uuid = uuidv4();
        let data = {
            uuid : uuid,
            name : username,
            pwd : password,
            email : email,
            dms : []
        }
        data = {
            token : 's16ond26',
            action : 'c',
            uuid : uuid,
            payload : data
        }
        let dataJSON = JSON.stringify(data);
        let apiUrl = 'https://api.projectnodenium.com/ChatApp/user.php';
        console.log(apiUrl);
        fetch(apiUrl,{
            method: 'POST',
            body: dataJSON
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            if (data.status === 'SUCCESS'){
                props.setUser(data.payload);
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
            <div className="register-modal">
                <div className="register-modal-content">
                    <div className="register-modal-header">
                        <h2>Register</h2>
                    </div>
                    <div className="register-modal-body">
                        <form onSubmit={formHandler}>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input type="text" name="username" id="username" placeholder="Enter Username" required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" name="email" id="email" placeholder="Enter Email" required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" id="password" placeholder="Enter Password" required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password2">Confirm Password</label>
                                <input type="password" name="password2" id="password2" placeholder="Confirm Password" required/>
                            </div>
                            <input type="submit" value="Register" className="btn btn-primary btn-block"/>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}


