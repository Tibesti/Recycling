import React from 'react';
import {Link} from 'react-router-dom';

import '../index.css';


class Footer extends React.Component {
    render(){
        return(
            <div className="footer">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-md-12 col-lg-3 footer-div">
                            <h2>Logo</h2>
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
                            <p>728536858</p>
                            <p>support@sof</p>
                            <p>address</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Footer;