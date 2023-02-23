import React, { useState, useRef, useEffect} from 'react';
import './App.css';
import Home from './pages/Home.js';
import Chat from './pages/Chat.js';

function App() {
  const [user, setUser] = useState([]);
  const apiUrl = 'https://api.projectnodenium.com/ChatApp/user.php?token=s16ond26&action=g';
  let isLoggedin = false;
  function getUser() {
    fetch(apiUrl + '/')
      .then(response => response.json())
      .then(data => setUser(data));
  }

  function getPage(){
    if (isLoggedin)
      return <Chat />
    return <Home/>
  }

  return (
    <main className='main-app'>
      {getPage()}
    </main>
  );
}

export default App;
