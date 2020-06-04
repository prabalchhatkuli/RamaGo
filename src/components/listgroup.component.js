import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup'

export default function AddressList(props){

        //must have a go back button to the respective input field  /* complete after displaying list
        //each list element must drop down or display the list of stops(if any)

        return(
            <div>
                <ListGroup>
                {
                    props.routeList.map(function(route,index){
                        //return <option key={dest} value={dest}>{dest} </option>;
                    return (<ListGroup.Item action variant="info" key={index}> {props.origin} @ {route[props.origin]}  &  {props.dest} @ {route[props.dest]}
                    </ListGroup.Item>);
                    })
                }
                </ListGroup>
                
                <p>You are on the display listGroup component!   ;)</p>
            </div>
        );
    
};

/*

*/