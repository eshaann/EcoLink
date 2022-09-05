import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';


export default function Home() {
    let navigate = useNavigate();
    const routeChange = () =>{ 
    let path = '/signup'; 
    navigate(path);
    }
  return (
    <div id="headCard" style={{paddingLeft:'5%', paddingTop:'5%'}}>
    <Card style={{ width: '30rem'}}>
      <Card.Img variant="top" src="https://www.treehugger.com/thmb/QolJfOYFmxwIH6Sxv5SBqY8Kq-M=/1885x1414/smart/filters:no_upscale()/GettyImages-1273584292-cbcd5f85f4c646d58f7a7fa158dcaaeb.jpg" />
      <Card.Body>
        <Card.Title>The Home of Environmental Volunteering</Card.Title>
        <Card.Text>
          Connecting Communities to Preserve the Earth
        </Card.Text>
        <Button style = {{display:'flex', justifyContent: 'center', alignItems:'center'}}variant="primary" onClick={() => { routeChange()}}>Join Us</Button>
      </Card.Body>
    </Card>
    </div>
  )
}
