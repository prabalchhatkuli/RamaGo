import React, { Component} from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { TimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import axios from 'axios'
import AddressList from "../components/listgroup.component";

const dayList=['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const destList=['Select','Ramapo','Route 17'];
//const originList=['Select','Ramapo','Route 17'];

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

        this.onChangedDest = this.onChangedDest.bind(this);
        this.onChangedDay = this.onChangedDay.bind(this);
        this.onChangedTime = this.onChangedTime.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

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
            origin:'Ramapo',
            dest: 'Select',
            day: dayOfWeek,
            time: currentTime
        });
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
            const response = await axios.post('http://localhost:5000/database/displayByDestination',schedule);

            //no need to implement callback
            this.setState(()=>({
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
                routeList={this.state.routeList}
            />);
        }
        else
        {
            return(
                <div>
                    <h3> Find a Train Shuttle </h3>
                    <form onSubmit={this.onSubmit}>

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
            )
        }             
    }
}