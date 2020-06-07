import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Form} from 'react-bootstrap';
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
            customDateSelection: false,
            customDayArray:{Sunday:'off', Monday:'off', Tuesday:'off', 
                            Wednesday:'off', Thursday:'off', Friday:'off', Saturday:'off'}
        }
        this.onFileChange=this.onFileChange.bind(this);
        this.onNameChange=this.onNameChange.bind(this);
        this.onFileUpload=this.onFileUpload.bind(this);
        this.daySelectionChange=this.daySelectionChange.bind(this);
        this.customDayChoice=this.customDayChoice.bind(this);
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
        if(this.state.selectedDay==="Custom")
        {
            await this.setState({
                customDateSelection: true
            })
        }
        else
        {
            await this.setState({
                customDateSelection: false
            })
        }
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
                const errorMsg = <p>Error in uploading. Please upload again.</p>
                ReactDOM.render(errorMsg, document.getElementById('upload result'));
                return;
            }
            const successMsg = <p>Successfully uploaded.</p>
            this.setState({
                isFileUploaded: true
            })
            ReactDOM.render(successMsg, document.getElementById('upload result'));
    }


    render() {
        return (
            <div>
                <h4>
                    Choose file to Upload
                </h4>  
                <h5>
                    Please select only one file.
                </h5>    
                <input type="file" onChange={this.onFileChange} /> 
                <input type="text" onChange={this.onNameChange} placeholder="Schedule name"/>
                <button onClick={this.onFileUpload}> 
                    Upload
                </button> 
                {
                    this.state.isFileUploaded?
                    <div className="container">
                        <h5>Please provide information for new schedule.</h5>
                        <form>
                            {
                                //add select boxes to select weekday/weekend/all week/custom
                                //if custom let the user select the days radio boxes, it is valid for
                            }
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
                                   custom date selection selected
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
                                    custom date selection not selected
                                </div>
                           }

                            <button>Submit Information</button>
                        </form>
                    </div>
                    :
                    <p>Please upload a file to proceed with other instructions.</p>
                }
            </div>
        )
    }
}
