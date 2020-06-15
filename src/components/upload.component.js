import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Form, Button, Col} from 'react-bootstrap';
import axios from 'axios';

export default class Upload extends Component {
    constructor(props)
    {
        super(props);
        this.state={
            filename:'',
            selectedFile: null,
            isFileUploaded: true,
            selectedDay:'',
            selectedRoute:'',
            customDateSelection: false,
            customDayArray:{Sunday:'off', Monday:'off', Tuesday:'off', 
                            Wednesday:'off', Thursday:'off', Friday:'off', Saturday:'off'}
        }
        this.onFileChange=this.onFileChange.bind(this);
        this.onNameChange=this.onNameChange.bind(this);
        this.onFileUpload=this.onFileUpload.bind(this);
        this.daySelectionChange=this.daySelectionChange.bind(this);
        this.routeSelectionChange=this.routeSelectionChange.bind(this);
        this.customDayChoice=this.customDayChoice.bind(this);
        this.onInfoSubmit = this.onInfoSubmit.bind(this);
    }

    async componentDidMount(){
        let temp_customDateArray={...this.state.customDayArray};
        ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((type)=>{
            temp_customDateArray[type]='on';
            return null;
        });
        await this.setState({
            selectedDay:'Weekday',
            selectedRoute: 'Area',
            customDayArray:temp_customDateArray
        });
}

    async routeSelectionChange(e){
        await this.setState({selectedRoute:e.target.value});
    }

    async onInfoSubmit(e)
    {
        let payload={Route:this.state.selectedRoute, daysAffected:this.state.customDayArray};
        try
        {
            const response = await axios.post('http://localhost:5000/update/uploadfile/1234',payload);

            //no need to implement callback
            this.setState(()=>({
                receivedData: true,
                routeList: response.data 
            }));
        }
        catch(error)
        {
            console.log(error);
            const errorMsg = <p className="text-warning">Error in uploading. Please upload again.</p>
            ReactDOM.render(errorMsg, document.getElementById('upload result'));
            return;
        }
        const successMsg = <p className="text-success">Successfully updated. Ready for another file.</p>
        this.setState({
            isFileUploaded: false
        })
        ReactDOM.render(successMsg, document.getElementById('upload result'));
    }

    async customDayChoice(e){
        let temp_customDateArray={...this.state.customDayArray};
        console.log(e.target.id);
        console.log(e.target.value);
        if(temp_customDateArray[e.target.id]==='on')
        {
            temp_customDateArray[e.target.id]='off';
        }
        else
        {
            temp_customDateArray[e.target.id]='on';
        }
        await this.setState({customDayArray:temp_customDateArray});
        console.log(this.state.customDayArray);
    }

    async daySelectionChange(e){
        await this.setState({selectedDay:e.target.value});
        console.log(this.state.selectedDay);
        let temp_customDateArray={...this.state.customDayArray};
        if(this.state.selectedDay==="Custom")
        {
            Object.keys(temp_customDateArray).forEach(k => {
                temp_customDateArray[k] = 'off'})

            await this.setState({
                customDateSelection: true
            })
        }
        else
        {
            await this.setState({
                customDateSelection: false
            })

            switch(this.state.selectedDay){
                case "All Week":
                    Object.keys(temp_customDateArray).forEach(k => {
                        temp_customDateArray[k] = 'on'})
                    break;
                case "Weekday":
                    ['Saturday', 'Sunday'].map((type)=>{
                        temp_customDateArray[type]='off';
                    });
                    ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((type)=>{
                        temp_customDateArray[type]='on';
                    });
                    break;
                case "Weekend":
                    ['Saturday', 'Sunday'].map((type)=>{
                        temp_customDateArray[type]='on';
                    });
                    ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((type)=>{
                        temp_customDateArray[type]='off';
                    });
                    break;
                default:
                    console.log("selection not found")
                    break;
            }
        }
        await this.setState({customDayArray:temp_customDateArray});
        console.log(this.state.customDayArray);
    }

    async onFileChange(e){ 
     
        //file type must be checked to be either .csv or excel file
        // Update the state 
        await this.setState({
            selectedFile: e.target.files[0]
        })
        console.log(this.state.selectedFile);
    }

    onNameChange(e){

        this.setState({ filename: e.target.value });

        console.log(this.state.filename);
    }

    async onFileUpload(e) {
        if(this.state.selectedFile===null){
            return;
        }

        const formData = new FormData(); 

        formData.append( 
            "myFile", 
            this.state.selectedFile, 
            this.state.filename,
            this.state.selectedFile.name
        );

        try
        {
            const response = await axios.post('http://localhost:5000/update/uploadfile',formData);

            //no need to implement callback
            this.setState(()=>({
                receivedData: true,
                routeList: response.data 
            }));
        }
        catch(error)
        {
            console.log(error);
            const errorMsg = <p className="text-warning">Error in uploading. Please upload file again.</p>
            ReactDOM.render(errorMsg, document.getElementById('upload result'));
            return;
        }
        const successMsg = <p className="text-success">Successfully uploaded. Please provide further info to continue.</p>
        this.setState({
            isFileUploaded: true
        })
        ReactDOM.render(successMsg, document.getElementById('upload result'));
        console.log("uploades in the server is message diaplayed?");
    }


    render() {
        return (
            <div className="container">
                <h4>
                    Choose file to Upload
                </h4>  
                <h5 className="text-success">
                    Please select only one file.
                </h5>
                
                <div className ='container'>
                    <Form>
                        <Form.Group controlId="formBasicEmail"> 
                            <input type="file" onChange={this.onFileChange} />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail"> 
                            <Col sm="5">
                            <Form.Control type="email" placeholder="Enter Filename" onChange={this.onNameChange}/>
                            </Col>
                        </Form.Group>
                        <div id='upload result'><p>Upload file and enter filename.</p></div>
                        <Button variant="primary" onClick={this.onFileUpload}> 
                            Upload
                        </Button> 
                    </Form>
                </div>
                {
                    this.state.isFileUploaded?
                    <div className ='container'>
                        <h5>Please provide information for this new schedule.</h5>
                        <form>
                            {
                                //add select boxes to select weekday/weekend/all week/custom
                                //if custom let the user select the days radio boxes, it is valid for
                            }
                            <Form.Group controlId="exampleForm.SelectCustom">
                                <select ref="userInput" className="form-control" onChange={this.routeSelectionChange}>
                                        <option>Area</option>
                                        <option>Train</option>
                                        <option>Both</option>
                                        <option>Express</option>
                                </select>
                            </Form.Group>
                            <Form.Group controlId="exampleForm.SelectCustom">
                                <select ref="userInput" className="form-control" onChange={this.daySelectionChange}>
                                        <option>Weekday</option>
                                        <option>Weekend</option>
                                        <option>All Week</option>
                                        <option>Custom</option>
                                </select>
                            </Form.Group>
                           {
                               this.state.customDateSelection?
                               <div>
                                   {Object.keys(this.state.customDayArray).map((type) => (
                                        <div key={`custom-${type}`} className="mb-3">
                                            <Form.Check 
                                                custom
                                                type="checkbox"
                                                id={`${type}`}
                                                label={`${type}`}
                                                onChange={this.customDayChoice}
                                            />
                                        </div>
                                   ))}
                                </div>
                                :
                                <div>
                                </div>
                           }

                            <Button onClick={this.onInfoSubmit}>Submit Information</Button>
                        </form>
                    </div>
                    :
                    <p>Please upload a file to proceed with other instructions.</p>
                }
            </div>
        )
    }
}
