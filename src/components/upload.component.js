import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';

export default class Upload extends Component {
    constructor(props)
    {
        super(props);
        this.state={
            filename:'',
            selectedFile: null
        }
        this.onFileChange=this.onFileChange.bind(this);
        this.onNameChange=this.onNameChange.bind(this);
        this.onFileUpload=this.onFileUpload.bind(this);
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

        const formData = new FormData(); 

        formData.append( 
            "myFile", 
            this.state.selectedFile, 
            this.state.filename,
            this.state.selectedFile.name
        );

        console.log(this.state.selectedFile);

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
                <div id='upload result'></div>
            </div>
        )
    }
}
