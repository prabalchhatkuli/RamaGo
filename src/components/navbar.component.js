import React, { Component } from 'react';
// import { Link } from 'react-router-dom'; --> check if needed

import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

//{{background-color: '#e3f2fd';}}

export default class Naviagation extends Component{

    render(){
       return(
        <Navbar collapseOnSelect expand="lg" variant="dark" style={{"backgroundColor":"#8c0000"}}>
				<Navbar.Brand href="/">RamaGo<sup>Beta</sup></Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="ml-auto">
						<Nav.Link href="/area">Get Shuttle Schedule</Nav.Link>
                        <Nav.Link href="/nyc">New York(Coach USA)</Nav.Link>
						<Nav.Link href="/upload">Upload Schedule</Nav.Link>
					</Nav>
				</Navbar.Collapse>
		</Navbar>
       );
    }
}