import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import { useNavigate } from "react-router-dom";

export default function EventPost() {
    const [description, setDescription] = useState()
    const[title, setTitle] = useState()
    const[dateTime, setDateTime] = useState()
    const[duration, setDuration] = useState()
    const[city, setCity] = useState()
    const[state, setState] = useState()
    const[address, setAddress] = useState()
    const[people, setPeople] = useState()
    let navigate = useNavigate();
    const routeChange = () =>{ 
    let path = '/events'; 
    navigate(path);
    }
      function handleClick() {
        console.log(dateTime)
        // Send data to the backend via POST
        fetch('http://localhost:5000/eventpost', {  // Enter your IP address here
        
          method: 'POST', 
          mode: 'cors', 
          body: JSON.stringify({
            "title": title,
            "description": description,
            "datetime": dateTime,
            "duration": duration,
            "city":city,
            "state":state,
            "address":address,
            "people_needed":people
            
        }), // body data type must match "Content-Type" header
          headers: {
            "Content-Type": "application/json"
          },
        })
        routeChange()
      }
  return (
    <div className = "EventPost">
    <Container>
<h1 style={{textAlign:'center'}}>Host An Environmental Volunteering Event!</h1>
<h2 style={{textAlign:'center'}}>Improve the Environment in Your Community</h2>
<img style={{float:'right', maxWidth:'60%', height:'auto', paddingRight:'5%', paddingTop:'5%'}}src="https://intermountainhealthcare.org/-/media/images/modules/blog/posts/2019/03/volunteering-is-good-for-you-and-your-kids.jpg?la=en&h=504&w=896&mw=896&hash=12B60E2046185023A7BB36AF203332C86DB664AE" alt='Volunteers'></img>
<form style={{paddingLeft:'10%'}}>
    <label for ="title">Title of Your Event</label>
    <br></br>
    <input type = "text" name="title" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}></input>
    <br></br>
    <label for ="description">Description</label>
    <br></br>
    <input type = "text" name="description" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}></input>
    <br></br>
    <label for ="datetime">Start Date and Time</label>
    <br></br>
    <input type = "datetime-local" name="datetime"  value={dateTime} onChange={(e) => setDateTime(e.target.value)}></input>
    <br></br>
    <label for="duration">Duration</label>
    <br></br>
    <input type="number" name = "duration" value={duration} onChange={(e) => setDuration(e.target.value)}></input> Hours
    <br></br>
    <label for="city">City</label>
    <br></br>
    <input type="text" name = "city" value={city} placeholder = "New York"onChange={(e) => setCity(e.target.value)}></input>
    <br></br>
    <label for="state">State</label>
    <br></br>
    <input type="text" name = "state" value={state} placeholder ="NY" onChange={(e) => setState(e.target.value)}></input>
    <br></br>
    <label for="address">Address</label>
    <br></br>
    <input type="text" name = "address" value={address} placeholder ="1600 Pennsylvania Avenue" onChange={(e) => setAddress(e.target.value)}></input>
    <br></br>
    <label for="people"># of People Needed</label>
    <br></br>
    <input type="number" name = "people" value={people} placeholder ="50" onChange={(e) => setPeople(e.target.value)}></input>
    <br></br>
    <br></br>
    <Button onClick={() => { handleClick()}} variant="primary">Post!</Button>
</form>
</Container>
</div>
  )
}
