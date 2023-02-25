import React, { useState, useRef, useEffect} from 'react';
import './App.css';
import Home from './pages/Home.js';
import Chat from './pages/Chat.js';

function App() {
  const [user, stateSetUser] = useState([]);
  let props = {
    setUser: setUser,
    getUser: getUser
  };

  function setUser(_user){
    stateSetUser({..._user});
  }
  function getUser(){
    return user;
  }
  function getPage(_user){
    if (_user !== undefined && (_user+"").length > 0)
      return <Chat key='chat' props={props}/>;
    else
      return <Home key='home' props={props}/>;
  }
  return (
    <main className='main-app'>
      {getPage(user)}
    </main>
  );
}

export default App;
