import { React, useState } from 'react'
import { BrowserRouter, Route } from "react-router-dom";
import './App.css';
import HomePage from './pages/HomePage'
import MusicPage2 from './pages/MusicPage2'
import LoginPage from './pages/LoginPage'
import NewUser from './pages/NewUser'
import EditUser from './pages/EditUser'

import Nav from './components/Nav'
import OneDrive from './pages/OneDrive';


function App() {

  // const [profile, setprofile] = useState('')



  return (
    <div className="App">
      <BrowserRouter>
      <Nav /> 
          <div>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/music" component={MusicPage2} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/new-user" component={NewUser} />
            <Route exact path="/profile" component={EditUser} />
            <Route exact path="/onedrive" component={OneDrive} />


            {/* <Route exact path="/wines/:wineID" component={WinePage} /> */}
          </div>
        </BrowserRouter>
    </div>
  );
}

export default App;
