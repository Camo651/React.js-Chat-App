import React from 'react';
import './App.css';
import Home from './pages/Home.js';
import Chat from './pages/Chat.js';

function App() {
  const [user, setUser] = React.useState(""); //user is the uuid of the current user

  function changeUser(newUser){
    setUser(newUser);
  }
  function getUser(){
    return user+"";
  }


  let props = { changeUser: changeUser, getUser: getUser };



  function getPage(){
    if (user.length !== 0)
      return <Chat key='chat' props={props}/>;
    else
      return <Home key='home' props={props}/>;
  }
  return (
    <main className='main-app'>
      {getPage()}
    </main>
  );
}

export default App;
