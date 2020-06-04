import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import Navbar from "./components/navbar.component";
import AreaShuttle from "./components/areashuttle.component";
import TrainShuttle from "./components/trainshuttle.component";
import MainPage from "./components/mainpage.component";
import Upload from "./components/upload.component";


import './App.css';

function App() {
  return (
    <Router>
        <div className="container">
        <Navbar/>
        <br/>
        <Route path="/" exact component={MainPage}/>
        <Route path="/area" component={AreaShuttle}/>
        <Route path="/train" component={TrainShuttle}/>
        <Route path="/nyc" component={AreaShuttle}/>
        <Route path="/upload" component={Upload}/>
      </div>
    </Router>
  );
}

export default App;
