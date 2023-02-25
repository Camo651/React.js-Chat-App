import React from 'react'
import LoginModal from '../Components/LoginModal.js';
import RegisterModal from '../Components/RegisterModal.js';


export default function Home({props}) {

  const [modal, setModal] = React.useState('');

  function clickHandler(e){
      let type = e.target.dataset.type;
      if (type === 'login'){
          setModal(<LoginModal key='loginModal' props={props}/>)
      } else if (type === 'register'){
          setModal(<RegisterModal key='registerModal' props={props}/>)
      }
  }
  

  return (
    <>
        <div className="home">
            <div className='title-section'>
                <h1>Chat App</h1>
                <p>Chat with your friends</p>
            </div>
            <div className='home-btns'>
                <button onClick={clickHandler} data-type='login' className='btn btn-primary'>Login</button>
                <button onClick={clickHandler} data-type='register' className='btn btn-secondary'>Register</button>
            </div>
        </div>
        {modal}
    </>
  )
}


