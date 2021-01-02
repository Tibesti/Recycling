import React from 'react';
import {Link} from 'react-router-dom';

import '../index.css';
import menu from '../img/menu.svg'
import logo from '../img/logo.jpg'


class Nav extends React.Component {
    componentDidMount(){
        var myNav = document.getElementById('nav');
        window.onscroll = function () { 
            "use strict";
            if (document.body.scrollTop >= 30 || document.documentElement.scrollTop >= 30 ) {
                myNav.classList.add("nav-div-colored");
            } 
            else {
                myNav.classList.remove("nav-div-colored");
            }
        };
    }

    showMobileNav = () => {
        document.getElementById('mobile-nav').classList.add("show")
        document.getElementById('mobile-nav').classList.remove("hide")
    }

    hideMobileNav = () => {
        document.getElementById('mobile-nav').classList.remove("show")
        document.getElementById('mobile-nav').classList.add("hide")
    }

    render(){
        return(
            <div id="nav" className="nav-div">
                <div className="container">
                    <img src={logo} alt="logo" className="nav-logo" />
                    <ul>
                        <Link to="/"><li>Say Hi</li></Link>
                        <Link to="/contact"><li>Contact Us</li></Link>
                        <Link to="/about"><li>About Us</li></Link>
                        <Link to="/"><li>Home</li></Link>
                    </ul>
                    <img src={menu} alt="menu" className="menu" onClick={this.showMobileNav} />
                </div>
                <div className="mobile-nav hide" id="mobile-nav">
                    <h1 style={{position:'absolute', top:'20px', right:'50px'}} onClick={this.hideMobileNav}>x</h1>
                    <Link to="/"><h4 className="mob-navlink">Home</h4></Link>
                    <Link to="/about"><h4 className="mob-navlink">About Us</h4></Link>
                    <Link to="/contact"><h4 className="mob-navlink">Contact Us</h4></Link>
                    <Link><h4 className="mob-navlink">Say Hi</h4></Link>
                </div>
            </div>
        )
    }
}

export default Nav;