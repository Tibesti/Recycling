import React from 'react';
import {Link} from 'react-router-dom';

import '../index.css';
import logo from '../img/logo-white.png';


class Footer extends React.Component {
    constructor(){
        super();
        this.state = {
            phone:'',
            email:'',
            address:'',
        }
    }
    componentDidMount(){
        fetch('http://api.aandtrecycling.com/footer', {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(resp => {
                    //console.log(resp);
                    this.setState({
                        phone: resp[0].phone,
                        email: resp[0].email,
                        address: resp[0].address,
                    })
                })
    }

    render(){
        return(
            <div className="footer">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-md-12 col-lg-3 footer-div">
                            <img src={logo} alt="logo" width="150px" />
                        </div>
                        <div className="col-sm-6 col-6 col-md-4 col-lg-3 footer-div">
                            <h4>Product</h4>
                            <p>PP</p>
                            <p>HDPE</p>
                            <p>PP</p>
                            <p>HDPE</p>
                        </div>
                        <div className="col-sm-6 col-6 col-md-4 col-lg-3 footer-div">
                            <h4>Company</h4>
                            <Link to="/" className="footer-link"><p>Home</p></Link>
                            <Link to="/about" className="footer-link"><p>About Us</p></Link>
                            <Link to="/contact" className="footer-link"><p>Contact Us</p></Link>
                        </div>
                        <div className="col-sm-12 col-md-4 col-lg-3">
                            <h4>Support</h4>
                            <p>0{this.state.phone}</p>
                            <p>{this.state.email}</p>
                            <p>{this.state.address}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Footer;