import React from 'react'

export default function LoginModal() {
  return (
    <>
        <div className="login-modal">
            <div className="login-modal-content">
                <div className="login-modal-header">
                    <h2>Login</h2>
                </div>
                <div className="login-modal-body">
                    <form>
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
            </div>
        </div>
    </>
  )
}
