import React from 'react'

export default function RegisterModal() {
  return (
    <>
        <div className="register-modal">
            <div className="register-modal-content">
                <div className="register-modal-header">
                    <h2>Register</h2>
                </div>
                <div className="register-modal-body">
                    <form>
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
