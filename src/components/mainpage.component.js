import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import '../stylesheets/customSheet.css';
//import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import CardGroup from 'react-bootstrap/CardGroup';
import Jumbotron from 'react-bootstrap/Jumbotron';


export default class MainPage extends Component{
    render(){
        return(
            
            <div>
                <Jumbotron>
                <h1>Hello, Roadrunners!</h1>
                <p>
                    This is a web application bootstrap with React and React-boostrap. The data on 
                    this page gets updated regularly.
                </p>
                <p>
                    <Button variant="primary">Learn more.</Button>
                </p>
                </Jumbotron>
                <CardGroup>
            
                    <Card className="text-center">
                        <Card.Img variant="top" src={require("../media/AreaShuttle.png")} />
                        <Card.Body>
                        <Card.Title>Area Shuttle</Card.Title>
                        <Card.Text>
                            The shuttle makes stops at a variety of locations offering numerous opportunities for Ramapo students.{' '}
                        </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                        <Button variant="primary" href="/area">Find Schedule</Button>
                        </Card.Footer>
                    </Card>
                    
                    <Card className="text-center">
                        <Card.Img variant="top" src={require("../media/TrainShuttle.png")} />
                        <Card.Body>
                        <Card.Title>Train Shuttle</Card.Title>
                        <Card.Text>
                            Located less than 4 miles from campus, this NJ Transit train station is on the Main/Bergen County line.{' '}
                        </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                        <Button variant="primary" href="/train">Find Schedule</Button>
                        </Card.Footer>
                    </Card>
                </CardGroup>

                <CardGroup>
                    <Card className="text-center">
                        <Card.Img variant="top" src={require("../media/CoachUSA.png")} />
                        <Card.Body>
                        <Card.Title>CoachUSA Bus to NYC</Card.Title>
                        <Card.Text>
                            Daily Bus Service to NYC: Departs from the Bradley Center.{' '}
                        </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                        <Button variant="primary" href="/nyc">Find Schedule</Button>
                        </Card.Footer>
                    </Card>
                    
                    <Card className="text-center">
                        <Card.Img variant="top" src={require("../media/gspShuttle.png")} />
                        <Card.Body>
                        <Card.Title>Garden State Plaza + Bergen Community College Shuttle</Card.Title>
                        <Card.Text>
                            This stop is serviced by the new Ramapo Roadrunner Express. Located at the intersection of Routes 4 and 17 in Paramus, this weekday mall stop is often used for the movies at the AMC Theaters. .{' '}
                        </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                        <Button variant="primary" href="/area">Find Schedule</Button>
                        </Card.Footer>
                    </Card>
                </CardGroup>
                
                    
            </div>
            
        )
    }

}