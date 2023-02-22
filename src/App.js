import React, { useState, useRef, useEffect} from 'react';
import './App.css';
import FriendsList from './Components/FriendsList.js';
import ChatPanel from './Components/ChatPanel.js';

function App() {
  return (
    <div>
      <div className="App">
        <header className="App-header">
          <h1>Chat App</h1>
        </header>
        <main>
          <FriendsList />
          <ChatPanel />
        </main>
      </div>
    </div>
  );
}

export default App;
