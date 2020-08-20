import React, { Component } from 'react'

export default class DaySchedule extends Component {
    constructor(props)
    {
        super(props);
        this.state={
            data:''
        }
    }

    async componentDidMount(){
        await this.setState({
            data: this.props.data
        })
        console.log(this.state.data);
    }

    render() {
        return (
            <div>
                
            </div>
        )
    }
}
