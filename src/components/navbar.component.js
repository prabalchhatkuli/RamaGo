import React, { Component } from 'react';
// import { Link } from 'react-router-dom'; --> check if needed

import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

export default class Naviagation extends Component{

    render(){
        
       return(
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
				<Navbar.Brand href="/">RamaGo</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="mr-auto">
						<Nav.Link href="/area">Area Shuttle</Nav.Link>
						<Nav.Link href="/train">Train Shuttle</Nav.Link>
                        <Nav.Link href="/nyc">New York(Coach USA)</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
       );
    }
}