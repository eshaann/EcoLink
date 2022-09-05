import './App.css';
import Login from "./components/Login/Login";
import Navigation from "./components/Navigation/Navigation"
import React from 'react';
import Home from "./components/Home/Home";
import Signup from "./components/Signup/Signup";
import EventPost from "./components/EventPost/EventPost";
import Events from "./components/Events/Events"
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Navigation />
      <Routes>
      <Route path = "/" element = {<Home />} />
        
      <Route path = "/login" element = {<Login />} />

      <Route path = "/signup" element = {<Signup />} />
      <Route path = "/hostevent" element = {<EventPost />} />
      <Route path = "/events" element = {<Events />} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
