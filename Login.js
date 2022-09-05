import React from 'react'
import Container from 'react-bootstrap/Container';
import './Login.css'
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState()
    const [uPassword, setPassword] = useState()
    let navigate = useNavigate(); 
    const routeChange = () =>{ 
    let path = '/'; 
    navigate(path);
    }
      function handleClick() {
        console.log(uPassword);
        // Send data to the backend via POST
        fetch('http://localhost:5000/login', {  // Enter your IP address here
        
          method: 'POST', 
          mode: 'cors', 
          body: JSON.stringify({
            "email": email,
            "password": uPassword,
        }), // body data type must match "Content-Type" header
          headers: {
            "Content-Type": "application/json"
          },
        })
        routeChange()
      }
  return (
    <div className="Login">
    <Container>
      <br></br>
        <h1>Log In to EcoLink</h1>
        <form action="/home">
            <label for="email">Email</label>
            <br></br>
            <input type="email" name = "email" placeholder="Your Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required></input>
            <br></br>
            <label for = "password">Password</label>
            <br></br>
            <input type="password" name = "password" placeholder="Create a Password" value={uPassword} onChange={(e) => setPassword(e.target.value)} required></input>
            <br></br>
            <br></br>
            <Button onClick={() => { handleClick()}} variant = "primary">Log In</Button>
            <br></br>
            <div>New to EcoLink? <a href = "/signup">Sign Up</a></div>
        </form>
    </Container>
    </div>
  )
}
