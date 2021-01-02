import React, { Component } from "react";
import {Link} from 'react-router-dom';

export default class Back extends Component{
    render(){
        return(
            <Link to="/admin">
                <button 
                    className="cnt-btn"
                    style={{
                        position:'fixed',
                        top:'20px',
                        left:'20px',
                        zIndex:'5'
                    }}
                >
                    Return to Dashboard
                </button>
            </Link>
        );
    }
}