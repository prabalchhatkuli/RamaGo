import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup'

export default function AddressList(props){

        //must have a go back button to the respective input field  /* complete after displaying list
        //each list element must drop down or display the list of stops(if any)
        function getHeaders()
        {
            return(
            <thead class="thead-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">{props.origin}</th>
                    <th scope="col">{props.dest}</th>
                </tr>
            </thead>);
        }

        function getRows()
        {
            if(props.routeList.Length>0){
                return(
                    <tr>
                        <td colSpan="3">No Routes found from {props.origin} to {props.dest} after {props.time}.</td>
                    </tr>
                )
            }
            else{
                return props.routeList.map(function(singleRoute,index){
                    //return <option key={dest} value={dest}>{dest} </option>;
                    return(
                        <tr>
                            <th scope="row">{index+1}</th>
                            <td>{singleRoute[props.origin]}</td>
                            <td>{singleRoute[props.dest]}</td>
                        </tr>
                    );
                })
            }
        }

        return(
            <div>
                <table class="table table-striped table-hover table-bordered">
                        {getHeaders()}
                    <tbody>
                        {getRows()}
                    </tbody>
                </table>
                
            </div>
        );
    
};

/*

*/