
import { Container } from 'react-bootstrap'

import React, { Component } from 'react'
import axios from 'axios'

export default class Events extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         events:[]
      }
    }
    componentDidMount(){
        axios.get('http://127.0.0.1:5000/eventscreated')
        .then(response => {
            console.log(response)
            this.setState({events:response.data})
        })
    }
  render() {
    const { events } = this.state
    return (
    <Container>
      <h1>Events Hosted by You</h1>
        <ul>
            {events.map((event,index)=>{
                return <li key={index}>
                <h2>Title: {event.title}</h2>
                <br></br>
                <h4>Description: {event.description}</h4>
                <br></br>
                <h4>Date and Time: {event.datetime}</h4>
                <br></br>
                <h4>Duration: {event.duration} Hours</h4>
                <br></br>
                <h4>Address: {event.address}</h4>
                <br></br>
                <h4>People Needed: {event.people_needed}</h4>

                </li>
            }
            )}
        </ul>
      </Container>
    )
  }
}

