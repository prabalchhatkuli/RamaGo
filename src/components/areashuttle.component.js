import React, { Component} from 'react';
import DateFnsUtils from '@date-io/date-fns';
import Button from 'react-bootstrap/Button';
import { TimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import axios from 'axios'
import AddressList from "./listgroup.component";
import Dialog from './dialog.component'

//need to obtain information about the day's destination from a ajax call to the server
const dayList=['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const destList=['Select','Ramapo','Moes','Interstate',	'Burlington/Modells','Garden State', 'Paramus Park','Care Plus','Fashion Center','Waldwick Medical','UG/Houlihans','Shannon Rose','Ramsey Square','Stateline','M/B','CPA','Overlook','Laurel Deck','Village', 'Bus Stop'];
const originList=['Ramapo','Moes','Interstate',	'Burlington/Modells','Garden State', 'Paramus Park','Care Plus','Fashion Center','Waldwick Medical','UG/Houlihans','Shannon Rose','Ramsey Square','Stateline','M/B','CPA','Overlook','Laurel Deck','Village', 'Bus Stop'];


function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

export default class AreaShuttle extends Component{
    constructor(props){
        super(props);

        this.onChangedOrigin = this.onChangedOrigin.bind(this);
        this.onChangedDest = this.onChangedDest.bind(this);
        this.onChangedDay = this.onChangedDay.bind(this);
        this.onChangedTime = this.onChangedTime.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onDropdownClick = this.onDropdownClick.bind(this);

        this.state = {
            origin : '',
            dest : '',
            day : '',
            time : '',
            receivedData: false,
            routeList:[]
        }
    }
    componentDidMount(){
            var currentTime = new Date();
            var dayOfWeek = dayList[currentTime.getDay()];
            this.setState({
                origin:'Leave Campus',
                dest: 'Interstate',
                day: dayOfWeek,
                time: currentTime
            });
    }

    onChangedOrigin(e){
        this.setState(
            {
                origin: e.target.value
            }
        );
        if(e.target.value==='Ramapo')
        {
            this.setState(
                {
                    origin: 'Leave Campus'
                }
            );
        }
    }

    onChangedDest(e){
        this.setState(
            {
                dest: e.target.value
            }
        );
    }

    onChangedDay(e){
        this.setState(
            {
                day: e.target.value
            }
        );
    }

    onChangedTime(dateTime){
        this.setState(
            {
                time: dateTime
            }
        )
    }

    onDropdownClick(value){
        console.log("clicked button "+ value);
    }

    async onSubmit(e){
            e.preventDefault();

            var time_12h = await formatAMPM(this.state.time);

            const schedule = {
                origin: this.state.origin,
                dest:this.state.dest,
                time: time_12h,
                day: this.state.day
            }

            console.log(schedule);
            

            //validate post request data *
                //if no error proceed to set state else: display error *
            try
            {
                const response = await axios.post('http://localhost:5000/database/displayByQuery',schedule);

                //no need to implement callback
                await this.setState(()=>({
                    receivedData: true,
                    routeList: response.data 
                }));
            }
            catch(error)
            {
                console.log(error);
            }
            
            //.then(console.log(this.state.routeList));
            //.then(res=>console.log(res.data))
            //window.location = '/';
    }

    render(){
        if(this.state.receivedData === true)
        {
            return(<AddressList
                origin={this.state.origin}
                dest={this.state.dest}
                time={this.state.time}
                routeList={this.state.routeList}
            />);
        }
        else
        {
            return(
                <div>
                    <hr/>
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <Dialog />
                            {/* <Button id="dropdown-basic-button">Find Schedule by <u>Day and Route</u></Button> */}
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <h4>or</h4>
                        </div>
                    </div>
                    <hr/>
                    <div>
                        <h3 className="col-md-12 text-center"> Find me a Shuttle </h3>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label> Origin: </label>
                                <select ref="userInput" className="form-control" value={this.state.origin} onChange={this.onChangedOrigin}>
                                {
                                    originList.map(function(origin){
                                        return <option key={origin} value={origin}>{origin} </option>;
                                    })
                                }
                                </select>
                            </div>

                            <div className="form-group">
                                <label> Destination: </label>
                                <select ref="userInput" className="form-control" value={this.state.dest} onChange={this.onChangedDest}>
                                {
                                    destList.map(function(dest){
                                        return <option key={dest} value={dest}>{dest} </option>;
                                    })
                                }
                                </select>
                            </div>
                            <div className="form-group">
                                <label> Day of Week: </label>
                                <select ref="userInput" className="form-control" value={this.state.day} onChange={this.onChangedDay}>
                                {
                                    dayList.map(function(day){
                                        var dayDisplayString = day;
                                        if(day===(dayList[(new Date()).getDay()])){
                                            dayDisplayString= dayDisplayString+' (today)';
                                        }
                                        return <option key={day} value={day}>{dayDisplayString} </option>;
                                    })
                                }
                                </select>
                            </div >

                            <div className="form-group">
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <label>Time:</label>
                                    <TimePicker 
                                    fullWidth
                                    mode='12h'
                                    margin="normal"
                                    variant="outlined"
                                    value={this.state.time}
                                    onChange={this.onChangedTime}/>
                            
                            </MuiPickersUtilsProvider>
                            </div>

                            <div className="form-group">
                                <input type="submit" value="Find Area Schedule" className="btn btn-primary"/>
                            </div>

                        </form>
                    </div>
                    <hr/>
                </div>
            )
        }             
    }

}