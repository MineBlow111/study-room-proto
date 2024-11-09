import React, {useState} from 'react';
import './App.css';
import './components/login/loginDes.css';
import { Auth } from './components/login/login.js';

import Cookies from 'universal-cookie';
const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get('auth-token'));
  const [room, setRoom] = useState(null);

  if (!isAuth) {
    return (
      <div className = "container">
        <Auth setIsAuth={setIsAuth} />
      </div>
    );
  }

  return (
    <div className = "App-header">
      { room ? <div> Chat </div> : <div className = 'room'>
        <p className =  "App"> Enter Room Name </p>
        <p/>
        <div className = "buttonAlign"> <input/> <p> </p> <button> ENTER CHAT </button> </div>
        </div>}
    </div>
  );
}

export default App;
