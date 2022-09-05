import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const [firstName, setfirstName] = useState()
    const [lastName, setlastName] = useState()
    const [email, setEmail] = useState()
    const [uPassword, setPassword] = useState()
    const [city, setCity] = useState()
    const [state, setState] = useState()
    let navigate = useNavigate(); 
    const routeChange = () =>{ 
    let path = '/login'; 
    navigate(path);
    }
      function handleClick() {
        console.log(uPassword);
        // Send data to the backend via POST
        fetch('http://localhost:5000/user', {  // Enter your IP address here
        
          method: 'POST', 
          mode: 'cors', 
          body: JSON.stringify({
            "email": email,
            "password": uPassword,
            "first_name": firstName,
            "last_name": lastName,
            "city": city,
            "state": state
        }), // body data type must match "Content-Type" header
          headers: {
            "Content-Type": "application/json"
          },
        })
        routeChange()
      }
  return (
    <div className = "Signup">
        <Container>
    <h1>Join EcoLink</h1>
    <h2>Improve the Environment in Your Community</h2>
    <form>
        <label for ="firstname">First Name</label>
        <br></br>
        <input type = "text" name="firstname" placeholder="First Name" value={firstName} onChange={(e) => setfirstName(e.target.value)} required></input>
        <br></br>
        <label for ="lastname">Last Name</label>
        <br></br>
        <input type = "text" name="lastname" placeholder="Last Name" value={lastName} onChange={(e) => setlastName(e.target.value)} required></input>
        <br></br>
        <label for ="email">Email</label>
        <br></br>
        <input type = "email" name="email" placeholder="Your Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required></input>
        <br></br>
        <label for="userPassword">Password</label>
        <br></br>
        <input type="password" name = "userPassword" placeholder="Create a Password" value={uPassword} onChange={(e) => setPassword(e.target.value)} required></input>
        <br></br>
        <label for="city">City</label>
        <br></br>
        <input type="text" name = "city" placeholder="Brooklyn" value={city} onChange={(e) => setCity(e.target.value)} required></input>
        <br></br>
        <label for="state">State</label>
        <br></br>
        <input type="text" name = "state" placeholder="NY" value={state} onChange={(e) => setState(e.target.value)} required></input>
        <br></br>
        <br></br>
        <Button onClick={() => { handleClick()}} variant="primary">Sign Up</Button>
    </form>
    </Container>
    </div>
  )
}
