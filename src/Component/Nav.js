import React from 'react';

import '../index.css';
import logo from '../img/logo.jpg'


class Nav extends React.Component {
    render(){
        return(
            <div style={{border:'1px solid red',}} className="nav-div">
                <div>
                    <img src={logo} alt="logo" className="nav-logo" />
                    <ul>
                        <li><button>PRODUCTS</button></li>
                        <li>HOME</li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Nav;